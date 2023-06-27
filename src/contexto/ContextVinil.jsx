import React, { createContext, useState } from "react";

const contextVinil = createContext();

const Provider = ({ children }) => {
  const [usuario, setUsuario] = useState({});
  const [carrito, setCarrito] = useState([]);

 /* const agregarAlCarrito = (album) => {
    setCarrito([...carrito, album]);
  };*/

  const agregarAlCarrito = (publicacion) => {
    setCarrito([...carrito, { ...publicacion, id: carrito.length }]);
  };

  return (
    <contextVinil.Provider
      value={{ usuario, setUsuario, carrito, agregarAlCarrito,setCarrito }}
    >
      {children}
    </contextVinil.Provider>
  );
};

export { Provider };
export default contextVinil;