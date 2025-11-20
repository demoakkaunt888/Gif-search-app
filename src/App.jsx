import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Body uslublari
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.fontFamily = "Arial, sans-serif";
  }, []);

  // Trending GIFlar
  useEffect(() => {
    fetch(`https://g.tenor.com/v1/trending?key=LIVDSRZULELA&limit=20`)
      .then(res => res.json())
      .then(data => setGifs(data.results))
      .catch(err => console.log(err));
  }, []);

  // Qidiruv funksiyasi
  const searchGifs = () => {
    if (!search.trim()) return;
    fetch(`https://g.tenor.com/v1/search?q=${search}&key=LIVDSRZULELA&limit=20`)
      .then(res => res.json())
      .then(data => setGifs(data.results))
      .catch(err => console.log(err));
  };

  // Sevimlilarga qo‘shish
  const addToFav = (gif) => {
    const exist = favorites.find(item => item.id === gif.id);
    if (!exist) {
      const newFav = [...favorites, gif];
      setFavorites(newFav);
      localStorage.setItem("favorites", JSON.stringify(newFav));
    }
  };

  // LocalStorage dan yuklash
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    if (saved) setFavorites(saved);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 GIF Qidiruv Ilovasi</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Gif nomini kiriting..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={searchGifs} style={styles.button}>Qidirish</button>
      </div>

      <h2 style={styles.subtitle}>Natijalar:</h2>

      <div style={styles.grid}>
        {gifs.map(gif => (
          <div key={gif.id} style={styles.card}>
            <img src={gif.media[0].gif.url} style={styles.image} />
            <button onClick={() => addToFav(gif)} style={styles.favButton}>
              ❤️ Sevimlilarga qo‘shish
            </button>
          </div>
        ))}
      </div>

      <h2 style={styles.subtitle}>Sevimlilar:</h2>

      <div style={styles.grid}>
        {favorites.map(gif => (
          <div key={gif.id} style={styles.card}>
            <img src={gif.media[0].gif.url} style={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


const styles = {
  container: {
    padding: "20px",
    width: "100%",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    color: "white",
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  },

  input: {
    padding: "10px",
    width: "260px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    fontSize: "16px",
  },

  button: {
    padding: "10px 14px",
    borderRadius: "6px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: "20px",
    color: "white",
    fontWeight: "bold",
    fontSize: "22px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "10px",
  },

  card: {
    background: "#fff",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
    transition: "0.2s",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  favButton: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#ff4d4f",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  }
};