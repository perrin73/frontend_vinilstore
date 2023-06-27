import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextVinil from "../contexto/ContextVinil";

function Galeria() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const { usuario, setUsuario, agregarAlCarrito, carrito } = useContext(
    contextVinil
  );
  const [conLogin, setConLogin] = useState(false);
  const [agregado, setAgregado] = useState(false);
  const [estaCargando, setEstaCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(usuario).length !== 0) {
      setConLogin(true);
    }
    const fetchData = async () => {
      setEstaCargando(true);
      try {
        const response = await fetch(
          "https://backend-vinilstore.vercel.app/laspublicaciones",
          { method: "GET" }
        );
        const data = await response.json();
        setPublicaciones(data.data);
        setEstaCargando(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setEstaCargando(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtrarPublicaciones = () => {
      let publicacionesFiltradas = publicaciones;

      if (conLogin) {
        publicacionesFiltradas = publicacionesFiltradas.filter(
          (publicacion) => publicacion.usuario_id !== usuario.datos.id
        );
      }

      if (filtroEstado !== "") {
        publicacionesFiltradas = publicacionesFiltradas.filter(
          (publicacion) => publicacion.estado === filtroEstado
        );
      }

      if (filtroNombre !== "") {
        const filtro = filtroNombre.toLowerCase();
        publicacionesFiltradas = publicacionesFiltradas.filter(
          (publicacion) =>
            publicacion.nombre.toLowerCase().includes(filtro) ||
            publicacion.artista.toLowerCase().includes(filtro)
        );
      }

      setPublicacionesFiltradas(publicacionesFiltradas);
    };

    filtrarPublicaciones();
  }, [filtroEstado, filtroNombre, publicaciones]);

  const alCarrito = (publicacion) => {
    agregarAlCarrito(publicacion);
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
    }, 2000);
  };

  return (
    <>
      <div className="row m-0">
        <div className="col-lg-3 col-md-3 col-sm-4">
          <div className="text-light mt-3 text-center mb-3 bg-dark rounded-5">
            Filtro por estado:
          </div>
          <select
            className="form-select mb-2"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Nuevo sellado">Nuevo sellado</option>
            <option value="Semi nuevo">Semi nuevo</option>
            <option value="Defecto estetico">Defecto estetico</option>
            <option value="Defecto audio">Defecto audio</option>
          </select>
          <div className="text-light mt-3 text-center mb-3 bg-dark rounded-5">
            Filtro por nombre o artista:
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o artista"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          {agregado && (
                        <div className="alert alert-success  position-absolute mt-5 ">
                          ¡Artículo agregado al carrito! 👍
                        </div>
                      )}
        </div>
        <div className="col-lg-9 col-md-9 col-sm-12">
          {estaCargando ? (
            <div className="text-center mt-2">
              <img
                className="rotarimage"
                style={{ maxHeight: "75%", maxWidth: "75%" }}
                src="../src/assets/disco.png"
                alt="cargando"
              />
            </div>
          ) : (
            ""
          )}
          <div className="row mt-3">
            {publicacionesFiltradas.map((publicacion) => (
              <div
                key={publicacion.id}
                className="col-lg-3 mb-2 col-md-4 col-sm-6 mb-2"
              >
                <div className="card">
                  <img
                    src={publicacion.imagen}
                    className="card-img-top"
                    alt={publicacion.nombre}
                  />
                  <div className="card-body border-top lh-1 text-center bodytarjeta">
                    <h6 className="card-title text-decoration-underline">
                      {publicacion.nombre}
                    </h6>
                    <p className="card-text">{publicacion.artista}</p>
                    <p className="card-text">
                      $ {publicacion.precio.toLocaleString("es-CL")}
                    </p>
                    <p className="card-text">{publicacion.estado}</p>
                  </div>
                  {conLogin && (
                    <div className="text-center">
                      <button
                        className="btn btn-sm btn-info mx-auto mb-1"
                        style={{ width: "40px" }}
                        onClick={() => alCarrito(publicacion)}
                      >
                        <i className="bi bi-cart"></i>
                      </button>
                      
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Galeria;
