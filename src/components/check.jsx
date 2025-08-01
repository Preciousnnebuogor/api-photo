import { useState, useEffect } from "react";

export default function Check() {
  const [inputValue, setInputValue] = useState("");
  const [display, setDisplay] = useState([]);
  const [page, setPage] = useState(1);

  const apiKey = process.env.REACT_APP_UNSPLASH_KEY;

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchImages();
    }
  }, [page]);

  async function fetchImages() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${inputValue}&page=${page}&per_page=10&client_id=${apiKey}`
      );
      const data = await response.json();
      setDisplay(data.results);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  }

  function handleSubmit() {
    setPage(1); // reset to page 1 when making a new search
    fetchImages();
  }

  return (
    <div className="container">
      <div className="content">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      <div className="results">
        {display.map((item, index) => (
          <div key={index}>
            <p>{item.alt_description || "No description"}</p>
            <img
              src={item.urls?.small}
              alt={item.alt_description || "Image"}
              style={{ width: "200px", height: "auto", marginBottom: "1rem" }}
            />
          </div>
        ))}
      </div>

      {display.length > 0 && (
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      )}
    </div>
  );
}
