import { useContext, useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import contextVinil from "../../contexto/ContextVinil";

function TusPublicaciones() {
  const { usuario, setUsuario } = useContext(contextVinil);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario.token || !usuario.datos || !usuario.datos.nombre) { navigate('/login')}  }, []);

    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://backend-vinilstore.vercel.app/publicaciones?userid=${usuario.datos.id}`,
          {method: 'GET',
          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuario.token}`}
      }
          
          );
          const data = await response.json();
          setPublicaciones(data.data);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
        

       
      <div className="row m-0">
        <div className="col-3">
        {usuario.datos && (
        <>
        <div className="bg-dark mt-3 text-light text-center rounded-5">{publicaciones.length} Publicaciones de {usuario.datos.nombre}</div>
            </>
      )} 
        </div>
        <div className="col-9">
          <div className="row mt-3">
          {publicaciones.map((publicacion) => (
            <div key={publicacion.id} className="col-3 mb-2">
              <div className="card">
              
                <img src={publicacion.imagen} className="card-img-top" alt={publicacion.nombre} />
                <div className="card-body border-top lh-1 text-center bodytarjeta">
                  <h6 className="card-title text-decoration-underline">{publicacion.nombre}</h6>
                  <p className="card-text">Artista: {publicacion.artista}</p>
                  <p className="card-text">Precio: $ {publicacion.precio.toLocaleString("es-CL")}</p>
                  <p className="card-text">Estado: {publicacion.estado}</p>
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

export default TusPublicaciones;
