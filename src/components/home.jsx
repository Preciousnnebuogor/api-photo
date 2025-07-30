import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [display, setDisplay] = useState([])
  function handleButton(){
  setDisplay((prev)=> ([...prev, inputValue]))
   setInputValue('')
  }
  return (
    <div className="container">
      <div className="content">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />

        <button onClick={handleButton}>Search</button>
      </div>

      <div>
        {display.map((value)=>{
          return <p>{value}</p>
        })}
      </div>
    </div>
  );
}
