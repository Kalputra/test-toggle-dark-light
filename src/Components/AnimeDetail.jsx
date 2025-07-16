// src/Components/AnimeDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// Check  `animeId` diterima sebagai prop
function AnimeDetail({ animeId }) {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true); // Default true
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!animeId) {
      setAnime(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    axios
      .get(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then((response) => {
        setAnime(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching anime details for ID:", animeId, err);
        setError(err);
        setLoading(false);
      });
  }, [animeId]);

  if (loading) return <div>Memuat detail anime...</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        Error: {error.message}. Gagal memuat detail anime ID: {animeId}.
      </div>
    );

  if (!anime && animeId)
    return <div>Detail anime dengan ID {animeId} tidak ditemukan.</div>;

  if (!anime && !animeId)
    return (
      <div>
        Pilih anime dari hasil pencarian di atas untuk melihat detailnya.
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center ",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      {/* Check `images` dan `webp` ada */}
      {anime.images && anime.images.webp && (
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          style={{
            maxWidth: "300px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        />
      )}

      <div
        style={{
          backgroundColor: "#353434ff",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <h2>{anime.title}</h2>
        <p>
          <b>MAL ID:</b> {anime.mal_id}
        </p>{" "}
        {/* untuk verifikasi ID */}
        <p>
          <b>Skor:</b> {anime.score || "N/A"}
        </p>
        <p>
          <b>Episode:</b> {anime.episodes || "N/A"}
        </p>
        <p>
          <b>Status:</b> {anime.status || "N/A"}
        </p>
        <p>
          <b>Sinopsis:</b>{" "}
          {anime.synopsis || "Tidak ada sinopsis yang tersedia."}
        </p>
        <a
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}
        >
          Cek di MyAnimeList
        </a>
      </div>
    </div>
  );
}

export default AnimeDetail;
