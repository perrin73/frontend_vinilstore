import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import contextVinil from "../contexto/ContextVinil";
import Galeria from './Galeria';


function Landing() {
  const navigate = useNavigate();
  const { usuario } = useContext(contextVinil);

  console.log('asi está usuario'+JSON.stringify(usuario))
  return (
    
    usuario.token ? (  <Galeria/>):(
    <div className="px-4 py-5 my-5 text-center">
    
    <h1 className="display-5 fw-bold text-light" style={{textShadow:'0 0 12px black'}} >El lugar donde vienen los que aman los vinilos</h1>
    <div className="col-lg-6 mx-auto">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" style={{backgroundColor: 'rgba(25,135,84,0.5)'}} onClick={()=> navigate(`/galeria`)} className="btn btn-success btn-lg px-4 gap-3">Revisa los vinilos publicados </button>
        
      </div>
    </div>
  </div>)
  );
}

export default Landing;