import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const TypeAhead = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  

  const handleArtistSelection = async (selected) => {
      let artist = selected[0].name;
      document.querySelector('.cardlist').scrollTop = 0;
      const albums_response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=17cc77161f71f4862428d38cc230c628&format=json`);
      const datartist = await albums_response.json();
      props.albumestop([])
      props.albumestop (datartist.topalbums.album) 
  };

  

  const handleSearch = async (query) => {
    setIsLoading(true);

    // Realiza una llamada a tu API para obtener las opciones según el query
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=17cc77161f71f4862428d38cc230c628&format=json`);
    const data = await response.json();

    // Obtén las opciones de la respuesta de la API
    const artistOptions = data.results.artistmatches.artist.map((artist) => ({
      name: artist.name,
      /*listeners: artist.listeners,
      url: artist.url,
      image: artist.image[0]['#text']*/
    }));

    setOptions(artistOptions);
    setIsLoading(false);
  };

  return (
    <AsyncTypeahead
      id="remote-typeahead"
      isLoading={isLoading}
      labelKey="name"
      onSearch={handleSearch}
      options={options}
      onChange={handleArtistSelection}
      placeholder="Escriba artista..."
    />
  );
};

export default TypeAhead;
