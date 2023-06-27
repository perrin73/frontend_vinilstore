import {Form,Button,Alert} from 'react-bootstrap/';
import { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import contextVinil from '../contexto/ContextVinil';

function LoginForm() {

  

  const {usuario,setUsuario} = useContext(contextVinil);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [estaCargando, setEstaCargando] = useState(false);
  const enviarLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

  try {
    setEstaCargando(true)
    const response = await fetch('https://backend-vinilstore.vercel.app/login', {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
    });
            
    if (response.ok) {
      const responseData = await response.json();
      setEstaCargando(false)
      setAlertMessage('Usuario ingresó exitosamente');
      setAlertVariant('success');
      setUsuario({token: responseData.token,datos: responseData.datos});
      navigate(`/publicaciones`)
     
      
    } else {
      setEstaCargando(false)
      setAlertMessage('Problemas con sus credenciales'); 
      setAlertVariant('danger');
      setTimeout(()=>{setAlertMessage('')}, 3000);
    }
  } catch (error) {
    setEstaCargando(false)
    setAlertMessage('Sin respuesta del servidor');
    setAlertVariant('danger');
    setTimeout(()=>{setAlertMessage('')}, 3000);
  }
};
  return (
    <>
    <div className="card pt-5 p-5 mw-25  h-50 position-absolute top-50 start-50 translate-middle d-flex justify-content-evenly">
      
      <h2 className='text-center'><span className="bi bi-disc-fill"></span> Login</h2>
      {alertMessage && <Alert className="fade show" variant={alertVariant}>{alertMessage}</Alert>}
      <Form className="d-flex flex-column h-100 justify-content-evenly" onSubmit={enviarLogin}> 
      <Form.Control type="email" name="email" placeholder="Email" />
      
      <Form.Control type="password" name="password" placeholder="Contraseña" />
      
      <Button  type='submit' variant="success">Ingresar<span><i className="bi bi-arrow-right ms-3"></i></span></Button>{' '}
      </Form>
      
    </div>
    { estaCargando ? (
    <div className="text-center mt-2">
    <img className="rotarimage" style={{ maxHeight: "75%",maxWidth: "75%" }} src={'../src/assets/disco.png'} alt="cargando"></img>
    </div>):('')
    } 
    </>
  );
    }

export default LoginForm;