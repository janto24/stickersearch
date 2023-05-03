import { useState, useEffect } from "react";

const apiKey = "3JlB0CKggMuIxKZxdjmzCx0Fg3KjKfnk&q";

const ApiSticks = ({search = `messi`} = {} ) => {
  const [sticks, setSticks ] = useState([]);
  const [inputText, setInputText] = useState("");
  const [seach, setSearch] = useState(search);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setSearch(inputText);
  };

  useEffect (() => {
    const apiUrl = `https://api.giphy.com/v1/stickers/search?api_key=${apiKey}=${seach}&limit=25&offset=0&rating=g&lang=es`;
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      fetch(apiUrl)
        .then(res => res.json())
        .then(response => {
          const {data} = response;
          const sticks = data.map(image => image.images.fixed_height_small.url);
          setSticks(sticks);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }, 5000);
  }, [seach]);

  return (
    <div className="container">
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={handleClick}>Buscar</button>
      {isLoading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      <div>
        {sticks.map((stick, index) => (
          <img key={index} src={stick} alt={`stick ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ApiSticks;
