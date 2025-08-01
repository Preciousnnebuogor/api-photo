import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [display, setDisplay] = useState([]);

  const apiKey = process.env.REACT_APP_UNSPLASH_KEY;
  async function handleSubmit() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${inputValue}&client_id=${apiKey}`
      );
      console.log("Splash Data", response);
      const data = await response.json();
      setDisplay(data.results);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  }
  return (
    <div className="container">
      <div className="content">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />

        <button onClick={handleSubmit}>Search1</button>
      </div>

      <div>
        {display &&
          display.map((items, index) => (
            <div key={index}>
              <p>{items.id}</p>
              {items.alt_description && <p>{items.alt_description}</p>}
              <img
                src={items.urls?.small}
                alt={items.alt_description || "Image"}
                style={{ width: "200px", height: "auto", marginBottom: "1rem" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
