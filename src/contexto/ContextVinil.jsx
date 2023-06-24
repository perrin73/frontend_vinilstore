 import { createContext, useState, useEffect } from "react";

const contextVinil = createContext();

const Provider = ({ children }) => {
 
 const [usuario,setUsuario]= useState({});


  
  return (
    <contextVinil.Provider
     value={{ usuario,setUsuario }} >
      {children}
    </contextVinil.Provider>
  );
};

export { Provider };
export default contextVinil; 
