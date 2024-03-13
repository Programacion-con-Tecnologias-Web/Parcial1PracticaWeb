import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://raw.githubusercontent.com/Programacion-con-Tecnologias-Web/Parcial1PracticaWeb/main/parcial1practica/src/views/Login.json');
      const data = await response.json();
      const user = data.find(user => user.email === email);
      if (user) {
        history.push(`/password?email=${encodeURIComponent(email)}`);
      } else {
        alert('Correo electrónico no válido');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Acceder</h1>
        <p>Entra con tu Cuenta UniAlpes</p>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
}

export default Login;
