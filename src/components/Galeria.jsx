import { useContext, useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';


function Galeria() {
  
  const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://backend-vinilstore.vercel.app/laspublicaciones`,{method: 'GET'});
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
        
        </div>
        <div className="col-9">
          <div className="row mt-3">
          {publicaciones.map((publicacion) => (
            <div key={publicacion.id} className="col-lg-3 mb-2 col-md-6 col-sm-12 mb-2">
              <div className="card">
              
                <img src={publicacion.imagen} className="card-img-top" alt={publicacion.nombre} />
                <div className="card-body border-top lh-1 text-center bodytarjeta">
                  <h6 className="card-title text-decoration-underline">{publicacion.nombre}</h6>
                  <p className="card-text">{publicacion.artista}</p>
                  <p className="card-text">$ {publicacion.precio.toLocaleString("es-CL")}</p>
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
