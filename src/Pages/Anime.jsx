import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AnimeSearch from "../Components/AnimeSearch";
import AnimeDetail from "../Components/AnimeDetail";
function Anime() {
  const { id } = useParams(); // Mengambil 'id' dari URL

  const [selectedAnimeIdFromSearch, setSelectedAnimeIdFromSearch] =
    useState(null);

  const handleAnimeSelect = (animeId) => {
    setSelectedAnimeIdFromSearch(animeId);
    localStorage.setItem("last_view", animeId) // Update state dengan ID anime yang diklik
  };

  const currentAnimeId = id || selectedAnimeIdFromSearch || localStorage.getItem("last_view");
  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      <h1>Halaman Anime</h1>
      <hr style={{ margin: "40px 0" }} />

      <h2>Cari Anime</h2>
      <AnimeSearch onAnimeSelect={handleAnimeSelect} />

      {/* {<AnimeDetail />} */}
      <hr style={{ margin: "40px 0" }} />
      {currentAnimeId ? (
        <>
          <h2 style={{ textAlign: "center" }}>Detail Anime</h2>
          <AnimeDetail animeId={currentAnimeId} />
        </>
      ) : (
        <>
          <h1>Detail Anime</h1>
          <p>Klik salah satu anime di atas untuk melihat detailnya.</p>
        </>
      )}
    </div>
  );
}

export default Anime;
