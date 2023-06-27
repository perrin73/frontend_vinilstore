import React, { useContext } from "react";
import contextVinil from "../../contexto/ContextVinil";

const Carro = () => {
  const { carrito, setCarrito } = useContext(contextVinil);

  const eliminarDelCarrito = (albumId) => {
    const albumIndex = carrito.findIndex((album) => album.id === albumId);
    if (albumIndex !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito.splice(albumIndex, 1);
      setCarrito(nuevoCarrito);
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, album) => total + album.precio, 0);
  };

  return (
    <div className="p-3 m-3 bg-light rounded-3 text-center">
      <h2><span className="bi bi-cart"></span> Carrito de Compras <span className="bi bi-cart"></span></h2>
      {carrito.length === 0 ? (
        <p>No hay álbumes en el carrito.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Artista</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((album) => (
              <tr key={album.id}>
                <td>
                  <img
                    src={album.imagen}
                    alt={album.nombre}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{album.nombre}</td>
                <td>{album.artista}</td>
                <td>${album.precio.toLocaleString("es-CL")}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDelCarrito(album.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex flex-row justify-content-evenly">
      <p>Total: ${calcularTotal().toLocaleString("es-CL")}</p>
      <p>Número de álbumes: {carrito.length}</p>

      <button className="btn btn-warning" onClick={vaciarCarrito}>
        Vaciar Carrito
      </button>
      </div>
    </div>
  );
};

export default Carro;
