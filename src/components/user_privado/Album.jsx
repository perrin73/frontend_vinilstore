import React, { useState, useEffect } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Album = ({ artista,nombre,precio,estado,id,setMostrarAlbum}) => {
  const [albumx, setAlbumx] = useState({});

  //*************

  useEffect(() => {
    const traeAlbum = async (artista, nombre) => {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=17cc77161f71f4862428d38cc230c628&artist=${artista}&album=${nombre}&format=json`
      );
      const { album } = await response.json();
      setAlbumx(await album);
    };

    traeAlbum(artista, nombre);
  }, [artista, nombre]);

  //*********************
  return (
    
    <div className="card-group w-75 mx-auto pt-1 " style={{ height: "490px" }}>
      <div className="card p-5 fichalbum justify-content-center">
        <div>album: {albumx.name}</div>
        <div>artista: {albumx.artist}</div>
        <div>pistas:</div>
        <ul className="lh-1">
          {albumx.tracks && albumx.tracks.track[0] ? (
            <>
              {albumx.tracks.track.map((pista, index) => (
                <li key={index}>{pista.name}</li>
              ))}
            </>
          ) : (
            <li>{albumx.name}</li>
          )}
        </ul>
        <button
          type="button"
          onClick={() => setMostrarAlbum(false)}
          className="w-25 mx-auto fixed-bottom position-relative btn-sm btn btn-primary">
          volver
        </button>
      </div>
      <div
        className="card justify-content-center"
        style={{ maxWidth: "800px", maxHeight: "500px" }}
      >
        <img
          className="mx-auto d-block"
          src="https://lastfm.freetls.fastly.net/i/u/300x300/0035400731bc49c94c70d82b8c31accf.jpg"
          alt="Imagen del álbum"
          style={{ maxHeight: "75%", maxWidth: "75%" }}
        />
        <div className="row mx-auto mt-1">
          <div className="col-6">
            <label htmlFor="precio" className="form-label">
              Precio:
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                $
              </span>
              <input
                id="precio"
                type="number"
                className="form-control"
                step="1000"
                placeholder="Precio"
                defaultValue={precio}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="estado" className="form-label">
              Estado:
            </label>
            <select id="estado" className="form-select" defaultValue={estado}>
              <option>Nuevo sellado</option>
              <option>Semi nuevo</option>
              <option>Defecto estetico</option>
              <option>Defecto audio</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <button type="button" className="w-25 mx-auto btn-sm btn btn-success">editar</button>
        <button type="button" className="w-25 mx-auto btn-sm btn btn-danger">eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default Album;
