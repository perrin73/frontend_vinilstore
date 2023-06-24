import { Form, Button, Alert } from "react-bootstrap/";
import TypeAhead from "./TypeAhead";
import React,{ useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import contextVinil from "../../contexto/ContextVinil";

function NuevoAlbum() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [albumElegido, setAlbumElegido] = useState(null);  
  const { usuario, setUsuario } = useContext(contextVinil);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  useEffect(() => {
    if (!usuario.token || !usuario.datos || !usuario.datos.nombre) {
      navigate('/login'); // Redirigir a la página de inicio de sesión si los datos no están disponibles
    }
  }, []);

  const listameAlbums = (losalbums) => {
    setAlbums(losalbums);
  };

  const muestrAlbum = async (index)=>{
   let conUnpersand = albums[index].name
   console.log('antes: '+conUnpersand);
   conUnpersand = conUnpersand.replace('&','%26')
   console.log('despues: '+conUnpersand);
   const album_resp = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=17cc77161f71f4862428d38cc230c628&artist=${albums[index].artist.name}&album=${conUnpersand}&format=json`);
   const datalbum = await album_resp.json();
   setAlbumElegido(await datalbum)
   
  };

  const volver = () => {
    setAlbumElegido(null);
  };

  //tomar los datos de album nombre.artista,mbid,imagen insertarlos en DB y devolver id album al back
  //en el back una vez tomado el id insertar publicacion con id de usuario ,precio y estado
  
  const enviarPublicacion = async () => {
    
    const nombre = albumElegido.album.name;
    const artista = albumElegido.album.artist;
    let mbid = albumElegido.album.mbid;
    const imagen = albumElegido.album.image[3]['#text'];
    const userid = usuario.datos.id;
    const precio = document.getElementById('precio').value;
    const estado = document.getElementById('estado').value;

    if(mbid == ''){
      mbid = 'sin';
    }  


  try {
    const response = await fetch('https://backend-vinilstore.vercel.app/publicar', {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}`
      },
      body: JSON.stringify({nombre,artista,mbid,imagen,precio,estado,userid})
    });
    
    
    if (response.ok) {
      setAlertMessage('Album publicado exitosamente');
      setAlertVariant('success');
      setTimeout(()=>{setAlertMessage('');setAlbumElegido('')}, 3000);
      
     
      
    } else {
      setAlertMessage('El precio es obligatorio');
      setAlertVariant('danger');
      setTimeout(()=>{setAlertMessage('')}, 3000);
    }
  } catch (error) {
    setAlertMessage('ERROR revise bien su conexion');
    setAlertVariant('danger');
    setTimeout(()=>{setAlertMessage('')}, 3000);
  }
};

 //******************************************* */ 
  return (
    <div className="card-group w-75 mx-auto pt-1 " style={{height:'490px'}}>
    {albumElegido ? (
         <>
          <div className="card p-5 fichalbum justify-content-center">
            <div>album: {albumElegido.album.name}</div>
            <div>artista: {albumElegido.album.artist}</div>
            <div>pistas:</div>
            <ul className="lh-1">
            {albumElegido.album.tracks && albumElegido.album.tracks.track[0] ? (
              <>
                
                <ul>
                  
                  {albumElegido.album.tracks.track.map((pista, index) => (
                     
                    <li key={index}>{pista.name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <ul><li>{albumElegido.album.name}</li></ul>
            )}
            </ul>
            {alertMessage && <Alert className="fade show text-center" variant={alertVariant}>{alertMessage}</Alert>}
            <Button className="w-25 mx-auto fixed-bottom position-relative btn-sm" onClick={volver}>volver</Button>            
          </div>
          <div className="card justify-content-center" style={{ maxWidth: "800px", maxHeight: "500px" }}>
            <img className="mx-auto d-block" style={{ maxHeight: "75%",maxWidth: "75%" }} src={albumElegido.album.image[3]['#text'] || "https://dummyimage.com/100x100/b0b0b0/ffffff.jpg&text=SIN+IMAGEN"} alt="Imagen del álbum"></img>
            <div className="row mx-auto mt-1">
            <div className="col-6">
    <label htmlFor="precio" className="form-label">Precio:</label>
    <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">$</span>
  <input id="precio" type="number" className="form-control" step="1000" placeholder="Precio" ></input>
</div>
  </div>
  <div className="col-6">
    <label htmlFor="estado" className="form-label">Estado:</label>
    <select id="estado" className="form-select">
      <option>Nuevo sellado</option>
      <option>Semi nuevo</option>
      <option>Defecto estetico</option>
      <option>Defecto audio</option>
     </select>
  </div>
  </div>
  <Button className="w-25 mx-auto d-block btn-sm" onClick={enviarPublicacion}>Publicar</Button>
          </div>
          
         </>
      ):(
         <>
            <div className="card justify-content-evenly p-3">
        <h2 className="text-center">Agregar Album</h2>
        <TypeAhead albumestop={listameAlbums} />
        
        
        </div>
        <div className="card cardlist overflow-auto" style={{maxWidth:"800px",maxHeight:"500px"}}>
    
                {albums.map((album,index) => (
                  album.image[2]['#text'] ?
                  <div className="row cardchica g-0 m-1 border border-secondary rounded" onClick={() => {muestrAlbum(index)}} key={index}>
                    <div className="col-md-3" >
                     <img className="rounded-start" style={{maxHeight:"100px"}}  src={album.image[2]['#text'] ? album.image[2]['#text']:"https://dummyimage.com/100x100/b0b0b0/ffffff.jpg&text=SIN+IMAGEN" }></img>
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="fs-6" >{album.name}</h5>
                        <p className="card-text">reproducciones : {album.playcount}</p>
                        
                      </div>
                    </div>
                  </div>
                  : ''
                ))}
    </div>  
            </>)}
              
    </div>
  );
}

export default NuevoAlbum;
