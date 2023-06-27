import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import contextVinil from "../../contexto/ContextVinil";
import Album from "./Album";

function TusPublicaciones() {
  const { usuario, setUsuario } = useContext(contextVinil);
  const [mostrarAlbum, setMostrarAlbum] = useState(false);
  const [albumSeleccionado, setAlbumSeleccionado] = useState({});
  const [estaCargando, setEstaCargando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario.token || !usuario.datos || !usuario.datos.nombre) {
      navigate('/login');
    }
  }, []);

  const [publicaciones, setPublicaciones] = useState([]);

  const navigateToAlbum = (artista, nombre, precio, estado, id) => {
    setAlbumSeleccionado({ artista, nombre, precio, estado, id });
    setMostrarAlbum(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEstaCargando(true);
        const response = await fetch(`https://backend-vinilstore.vercel.app/publicaciones?userid=${usuario.datos.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
          }
        });
        const data = await response.json();
        setPublicaciones(data.data);
        setEstaCargando(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setEstaCargando(false);
      }
    };

    fetchData();
  }, [mostrarAlbum]);

  return (
    <>
      {!mostrarAlbum && (
        <div className="row m-0">
          <div className="col-3">
            {usuario.datos && (
              <>
                <div className="bg-dark mt-3 text-light text-center rounded-5">
                  {publicaciones.length} Publicaciones de {usuario.datos.nombre}
                </div>
              </>
            )}
          </div>
          <div className="col-9">
            {estaCargando ? (
              <div className="text-center mt-2">
                <img className="rotarimage" style={{ maxHeight: "75%", maxWidth: "75%" }} src={'/src/assets/disco.png'} alt="cargando" />
              </div>
            ) : (
              <div className="row mt-3">
                {publicaciones.length === 0 ? (
                  <div className="col-9 bg-light rounded-3 p-3 text-center mt-3">
                    Aún no tienes publicaciones, puedes publicar en el menú superior 👆
                  </div>
                ) : (
                  publicaciones.map((publicacion) => (
                    <div key={publicacion.id} className="col-lg-3 mb-2 col-md-6 col-sm-12">
                      <div className="card">
                        <img src={publicacion.imagen} className="card-img-top" alt={publicacion.nombre} />
                        <div className="card-body border-top lh-1 text-center bodytarjeta">
                          <h6 className="card-title text-decoration-underline">{publicacion.nombre}</h6>
                          <p className="card-text">{publicacion.artista}</p>
                          <p className="card-text">{publicacion.precio.toLocaleString("es-CL")}</p>
                          <p className="card-text">{publicacion.estado}</p>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => navigateToAlbum(publicacion.artista, publicacion.nombre, publicacion.precio, publicacion.estado, publicacion.id)}
                          >
                            Ver más
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {mostrarAlbum && (
        <Album
          artista={albumSeleccionado.artista}
          nombre={albumSeleccionado.nombre}
          precio={albumSeleccionado.precio}
          estado={albumSeleccionado.estado}
          albumid={albumSeleccionado.id}
          setMostrarAlbum={setMostrarAlbum}
        />
      )}
    </>
  );
}

export default TusPublicaciones;
