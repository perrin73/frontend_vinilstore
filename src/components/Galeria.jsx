import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Galeria() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backend-vinilstore.vercel.app/laspublicaciones",
          { method: "GET" }
        );
        const data = await response.json();
        setPublicaciones(data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtrarPublicaciones = () => {
      let publicacionesFiltradas = publicaciones;

      // Filtrar por estado
      if (filtroEstado !== "") {
        publicacionesFiltradas = publicacionesFiltradas.filter(
          (publicacion) => publicacion.estado === filtroEstado
        );
      }

      // Filtrar por nombre o artista
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

  return (
    <>
      <div className="row m-0">
        <div className="col-3">
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

          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o artista"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
        <div className="col-9">
          <div className="row mt-3">
            {publicacionesFiltradas.map((publicacion) => (
              <div
                key={publicacion.id}
                className="col-lg-3 mb-2 col-md-6 col-sm-12 mb-2"
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
