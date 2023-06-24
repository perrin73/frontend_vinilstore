import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import { Provider } from './contexto/ContextVinil';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import Landing from './components/Landing';
import SoloNavBar from './components/SoloNavBar';
import NuevoAlbum from './components/user_privado/NuevoAlbum';
import TusPublicaciones from './components/user_privado/TusPublicaciones';



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
      
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
 