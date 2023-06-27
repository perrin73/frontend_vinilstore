import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import { Provider } from './contexto/ContextVinil';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import Landing from './components/Landing';
import SoloNavBar from './components/SoloNavBar';
import NuevoAlbum from './components/user_privado/NuevoAlbum';
import TusPublicaciones from './components/user_privado/TusPublicaciones';
import Galeria from './components/Galeria';
import Album from './components/user_privado/Album';
import Carro from './components/user_privado/carro';
import Favoritos from './components/user_privado/Favoritos';


function App() {
  
  return (

    <>
    <Provider>
    <BrowserRouter>
    <SoloNavBar/>
    
    
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegForm/>}/>
      <Route path="/newalbum" element={<NuevoAlbum/>}/>
      <Route path="/publicaciones" element={<TusPublicaciones/>}/>
      <Route path="/galeria" element={<Galeria/>}/>
      <Route path="/album" element={<Album/>}/>
      <Route path="/carro" element={<Carro/>}/>
      <Route path="/favoritos" element={<Favoritos/>}/>
      
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
 