// src/Components/AnimeSearch.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AnimeSearch({ onAnimeSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil pencarian terakhir saat pertama kali render
  useEffect(() => {
    const savedSearch = localStorage.getItem("lastSearch");
    if (savedSearch) {
      setSearchTerm(savedSearch);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    // Simpan pencarian ke localStorage
    localStorage.setItem("lastSearch", searchTerm);

    const timerId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`
        );
        setSearchResults(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Cari anime..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />
      {loading && <p>Mencari...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {!loading && searchResults.length === 0 && searchTerm && (
        <p>Tidak ada hasil untuk "{searchTerm}".</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {searchResults.map((anime) => (
          <div
            key={anime.mal_id}
            style={{
              border: "1px solid #eee",
              padding: "10px",
              borderRadius: "8px",
              width: "180px",
              cursor: "pointer",
              transition: "transform 0.2s",
              backgroundColor: "#201f1fff",
            }}
            onClick={() => onAnimeSelect(anime.mal_id)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={anime.images?.webp?.large_image_url}
              alt={anime.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
            <h4>{anime.title}</h4>
            <p>Skor: {anime.score || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeSearch;
