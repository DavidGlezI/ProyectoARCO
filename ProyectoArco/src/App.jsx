
import { Tab } from '@mui/material';
import { Table } from './components/Table'
import Acceso from './components/Vistas/Acceso';
import Cancelacion from './components/Vistas/Cancelacion';
import Oposicion from './components/Vistas/Oposicion';
import Rectificacion from './components/Vistas/Rectificacion';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Peticiones from './components/Vistas/Peticiones';
import logo from './public/37637.png';
function App() {
  
  return (
  <>
    <div className="titulo">
      <img className='foto' src={logo} alt={"/"} />
    </div>
    <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Table/>}/>
                <Route path="/peticiones" element = {<Peticiones/>}/>
                <Route path="/Acceso/:userId" element={<Acceso/>}/>
                <Route path="/Rectificacion/:userId" element={<Rectificacion/>}/>
                <Route path="/Cancelacion/:userId" element={<Cancelacion/>}/>
                <Route path="/Oposicion/:userId" element={<Oposicion/>}/>
          </Routes>
    </BrowserRouter>   
  </>
  )
}

export default App
