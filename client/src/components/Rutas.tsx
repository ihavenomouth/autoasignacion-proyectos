import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Main from '../pages/Main';
import MainAdmin from '../pages/MainAdmin';
import CrearCuenta from '../pages/CrearCuenta';
import Page404 from '../pages/Page404';

const Rutas = () => {

  
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/verproyectos" element={<VerProyectos />} /> */}
        <Route path="/crearcuenta" element={<CrearCuenta />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mainAdmin" element={<MainAdmin />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    // </BrowserRouter>
  );
}
export default Rutas;