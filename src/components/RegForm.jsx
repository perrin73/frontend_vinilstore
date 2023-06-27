import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function RegForm() {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const nombre = form.elements.nombre.value;
    const email = form.elements.email.value;
    const ciudad = form.elements.ciudad.value;
    const password = form.elements.password.value;
    const repassword = form.elements.repassword.value;

    if (password !== repassword) {
      
      setAlertMessage('Las contraseñas no coinciden');
      setAlertVariant('danger');
      setTimeout(()=>{setAlertMessage(''); }, 3000);
      
    }
   else
   {
    try {
      const response = await fetch('https://backend-vinilstore.vercel.app/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          email,
          ciudad,
          password
        })
      });

      if (response.ok) {
        setAlertMessage('Usuario se agregó exitosamente ahora le enviaremos a login');
        setAlertVariant('success');
        form.reset();
        setTimeout(()=>{setAlertMessage(''); navigate(`/publicaciones`)}, 3000);
      } else {
        setAlertMessage('Usuario no se agregó hubo un error ¿llenó todos los campos?');
        setAlertVariant('danger');
        setTimeout(()=>{setAlertMessage('')}, 3000);
      }
    } catch (error) {
      setAlertMessage('Usuario no se agregó hubo un error ¿llenó todos los campos?');
      setAlertVariant('danger');
      setTimeout(()=>{setAlertMessage('')}, 3000);
    }
   }
  };

  return (
    <div className="card pt-5 p-5 mw-50 h-75 position-absolute top-50 start-50 translate-middle d-flex justify-content-center">
      <h2 className="text-center">
        <span className="bi bi-disc-fill"></span> Registrarse
      </h2>
      {alertMessage && <Alert className="fade show" variant={alertVariant}>{alertMessage}</Alert>}
      <Form className="d-flex flex-column h-100 justify-content-evenly" onSubmit={handleSubmit}>
        <Form.Control className="fs-6" type="text" name="nombre" placeholder="Ingrese nombre o nick" />
        <Form.Control className="fs-6" type="email" name="email" placeholder="Ingrese email" />
        <Form.Control className="fs-6" type="text" name="ciudad" placeholder="Ingrese ciudad" />
        <Form.Control className="fs-6" type="password" name="password" placeholder="Contraseña" />
        <Form.Control className="fs-6" type="password" name="repassword"placeholder="Repita contraseña" />
        <Button type="submit" variant="success">
          Registrar <span className='ms-3'> <i className="bi bi-send "></i></span>
        </Button>
      </Form>
    </div>
  );
}

export default RegForm;
