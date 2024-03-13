import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from  './views/Login';
import CarDetail from './views/CarDetail';

// has el enrutamiento de las vistas hay un Home, Login que es el primero cuando se abre la aplicacion y CarDetail que es la vista de detalle de un carro

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/car/:carModel" element={<CarDetail />} /> 
      </Routes>
    </div>
    </Router>
  );
}

export default App;
