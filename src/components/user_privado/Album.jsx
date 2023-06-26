import {Alert} from "react-bootstrap/";
import React, { useState, useEffect,useContext,useRef } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import contextVinil from "../../contexto/ContextVinil";



const Album = ({ artista,nombre,precio,estado,albumid,setMostrarAlbum}) => {
  const [albumx, setAlbumx] = useState({});
  const { usuario, setUsuario } = useContext(contextVinil);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const precioRef = useRef();
  const estadoRef = useRef();
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

  const borrAlbum = async (albumid) => {
    try {
      const response = await fetch(`https://backend-vinilstore.vercel.app/eliminar`,
      {method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`},
      body: JSON.stringify({albumid})
      })
      const data = await response.json();
       
       //response.ok ? alert(data.message): alert('sin response')

       //***********************************
       if (response.ok) {
        setAlertMessage(data.message);
        setAlertVariant('success');
        setTimeout(()=>{setAlertMessage('');setMostrarAlbum(false)}, 3000);
        
       
        
      } else {
        setAlertMessage('No se pudo eliminar');
        setAlertVariant('danger');
        setTimeout(()=>{setAlertMessage('')}, 3000);
      }

       //************************************

      
    } catch (error) {
      console.log('Error al borrar:', error);
    }
  };

  //*******************************
  const editAlbum = async (albumid,precio,estado) => {
    try {
      const response = await fetch(`https://backend-vinilstore.vercel.app/editar`,
      {method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`},
      body: JSON.stringify({albumid,precio,estado})
      })
      const data = await response.json();
       
       //response.ok ? alert(data.message): alert('sin response')

       //***********************************
       if (response.ok) {
        setAlertMessage(data.message);
        setAlertVariant('success');
        setTimeout(()=>{setAlertMessage('');setMostrarAlbum(false)}, 3000);
        
       
        
      } else {
        setAlertMessage('No se pudo eliminar');
        setAlertVariant('danger');
        setTimeout(()=>{setAlertMessage('')}, 3000);
      }

       //************************************

      
    } catch (error) {
      console.log('Error al borrar:', error);
    }
  };
  return (
    
    <div className="card-group w-75 mx-auto pt-1 " style={{ height: "490px" }}>
      <div className="card p-5 fichalbum justify-content-center">
      {alertMessage && <Alert className="text-center" variant={alertVariant}>{alertMessage}</Alert>}
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
        {albumx.image && albumx.image[3]["#text"] && (
          <img
            className="mx-auto d-block"
            src={albumx.image[3]["#text"]}
            alt="Imagen del álbum"
            style={{ maxHeight: "75%", maxWidth: "75%" }}
          />
        )}
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
                ref={precioRef}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="estado" className="form-label">
              Estado:
            </label>
            <select id="estado" className="form-select" defaultValue={estado} ref={estadoRef}>
              <option>Nuevo sellado</option>
              <option>Semi nuevo</option>
              <option>Defecto estetico</option>
              <option>Defecto audio</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <button type="button" onClick={()=>{editAlbum(albumid,precioRef.current.value,estadoRef.current.value)}} className="w-25 mx-auto btn-sm btn btn-success">editar</button>
        <button type="button" onClick={()=>{borrAlbum(albumid)}} className="w-25 mx-auto btn-sm btn btn-danger" >eliminar</button>
        </div>
      </div>
      
    </div>
  );
};

export default Album;
