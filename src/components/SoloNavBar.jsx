import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import contextVinil from '../contexto/ContextVinil';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function SoloNavBar() {
  
  const { usuario, setUsuario } = useContext(contextVinil);
  
  
    

  const navigate = useNavigate();

  return (
    <Navbar className='p-3' style={{backgroundColor: 'rgba(0,0,0,0.5)'}} collapseOnSelect expand="lg" >
      <Container >
        <Navbar.Brand  onClick={()=> navigate(`/`)} className='text-light' style={{cursor: 'pointer'}}><span><i className="bi bi-disc-fill"></i></span> Vinyl Store</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav >
          {usuario.token ? (
              <>
                <Nav.Link className='text-light' onClick={()=> navigate(`/`)}><i className="bi bi-collection-fill"></i> Store </Nav.Link>
                <Nav.Link className='text-light' onClick={()=> navigate(`/newalbum`)}><i className="bi bi-heart-fill"></i> Mis favoritos </Nav.Link>
                <Nav.Link className='text-light' onClick={()=> navigate(`/publicaciones`)}><i className="bi bi-chat-left-dots-fill"></i> Mis publicaciones </Nav.Link>
                <Nav.Link className='text-light' onClick={()=> navigate(`/newalbum`)}><i className="bi bi-cloud-upload-fill"></i> Publicar album </Nav.Link>
                <Nav.Link className='text-light' onClick={()=>{setUsuario({}); navigate(`/login`)}}><i className="bi bi-door-closed-fill"></i> Cerrar Sesion </Nav.Link>
                {/* Agrega más enlaces específicos para la ruta "/publicaciones" si es necesario */}
              </>
            ) : (
              <>
                <Nav.Link className='text-light' onClick={()=> navigate(`/register`)}>Registrarse <i className="bi bi-person-fill-up"></i></Nav.Link>
                <Nav.Link className='text-light' onClick={()=> navigate(`/login`)}>Login <i className="bi bi-door-open-fill"></i></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SoloNavBar; 