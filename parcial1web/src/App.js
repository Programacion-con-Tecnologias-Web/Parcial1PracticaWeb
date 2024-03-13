import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './views/home';
import Login from  './views/login';
import './App.css';
import CarDetail from './views/carDetail';
import { IntlProvider } from 'react-intl';

import messages_es from './location/es.json';
import messages_en from './location/en.json';

function App() {
  const locale = navigator.language; // Obtiene el idioma del navegador
  const messages = locale === 'es-ES' || locale === 'es' ? messages_es : messages_en;

  return (
    <IntlProvider locale={locale} messages={messages}>
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/car/:carModel" element={<CarDetail />} /> 
      </Routes>
    </div>
    </Router>
    </IntlProvider>
  );
}

export default App;