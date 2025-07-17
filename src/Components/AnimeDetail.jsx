// src/Components/AnimeDetail.jsx
import { useState, useEffect } from "react";
import axios from "axios";

// Check  `animeId` diterima sebagai prop
function AnimeDetail({ animeId }) {
  const [lastView] = useState(localStorage.getItem("last_view") || null);
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true); // Default true
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!animeId) {
      setAnime(null);
      setLoading(false);
      return;
    }

    console.log("Fetching details for anime ID:", animeId);

    const id = animeId || lastView;

    setLoading(true);
    setError(null);
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => {
        setAnime(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching anime details for ID:", animeId, err);
        setError(err);
        setLoading(false);
      });
  }, [animeId, lastView]);

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
        boxShadow: "0 20px 18px rgba(120, 117, 117, 0.19)",
      }}
    >
      {/* Check `images` dan `webp` ada */}
      {anime.images && anime.images.webp && (
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          style={{
            maxWidth: "300px",
            boxShadow: "0 12px 8px #8c000044",
            borderRadius: "18px",
          }}
        />
      )}

      <div
        style={{
          backgroundColor: "#353434ff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px #000000ff",
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
