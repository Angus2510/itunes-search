import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Search.css";

function Search() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      let endpoint;
      switch (mediaType) {
        case "movie":
          endpoint = "movie/search";
          break;
        case "music":
          endpoint = "music/search";
          break;
        case "podcast":
          endpoint = "podcast/search";
          break;
        case "audiobook":
          endpoint = "audiobook/search";
          break;
        case "ebook":
          endpoint = "ebook/search";
          break;
        case "shortFilm":
          endpoint = "shortFilm/search";
          break;
        case "software":
          endpoint = "software/search";
          break;
        case "tvShow":
          endpoint = "tvShow/search";
          break;
        default:
          endpoint = "all/search";
      }

      const response = await fetch(
        `http://localhost:3001/${endpoint}/?term=${searchTerm}&media=${mediaType}`
      );
      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (event) => {
    setMediaType(event.target.value);
  };

  const handleFavorites = (result) => {
    setFavorites((prevFavorites) => [...prevFavorites, result]);
  };

  const removeFavorite = (trackId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.trackId !== trackId)
    );
  };

  return (
    <div className="container">
      <div className="searchbar">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="what are you looking for?"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>
        <Form>
          {[
            "movie",
            "podcast",
            "music",
            "audiobook",
            "shortFilm",
            "tvShow",
            "software",
            "ebook",
            "all",
          ].map((media) => (
            <Form.Check
              inline
              key={media}
              label={media}
              name="media"
              type="radio"
              value={media}
              checked={mediaType === media}
              onChange={handleCheckboxChange}
            />
          ))}
        </Form>
      </div>
      <div className="flex-container">
        {results.map((result) => (
          <div className="return" key={result.trackId}>
            <img src={result.artworkUrl100} alt={result.trackName} />
            <h6>{result.trackName}</h6>
            <h6>{result.artistName}</h6>

            <Button
              variant="outline-dark secondary"
              size="sm"
              onClick={() => handleFavorites(result)}
            >
              Add to Favorites
            </Button>
          </div>
        ))}
      </div>
      <div className="flex-container">
        {favorites.length > 0 && (
          <div className="return">
            <h2>Favorites</h2>
            {favorites.map((result) => (
              <div key={result.trackId}>
                <img src={result.artworkUrl100} alt={result.trackName} />
                <h6>{result.trackName}</h6>
                <h6>{result.artistName}</h6>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFavorite(result.trackId)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
