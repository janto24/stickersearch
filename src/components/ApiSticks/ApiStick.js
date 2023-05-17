import { useState, useEffect } from "react";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { Card } from '@mui/material/Card';

const apiKey = "3JlB0CKggMuIxKZxdjmzCx0Fg3KjKfnk&q";

const ApiSticks = ({ search = "messi" }) => {
  const [sticks, setSticks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState(search);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setSearchTerm(inputText);
  };

  useEffect(() => {
    const apiUrl = `https://api.giphy.com/v1/stickers/search?api_key=${apiKey}=${searchTerm}&limit=25&offset=0&rating=g&lang=es`;
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
          const { data } = response;
          const stickUrls = data.map((image) => image.images.fixed_height_small.url);
          setSticks(stickUrls);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, 5000);
  }, [searchTerm]);

  return (
    <div className="container">
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={handleClick}>Buscar</button>
      {isLoading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      
      <div>
        {sticks.map((stick, index) => (
          <div key={index}>
            <img src={stick} alt={`stick ${index}`} />
            <ShareButton stickUrl={stick} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ShareButton = ({ stickUrl }) => {
  return (
    <WhatsappShareButton url={stickUrl}>
      <WhatsappIcon round size={32} />
    </WhatsappShareButton>
  );
};

export default ApiSticks;
