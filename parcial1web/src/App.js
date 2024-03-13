import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './views/home';
import Login from  './views/login';
import CarDetail from './views/carDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/car/:carModel" element={<CarDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
