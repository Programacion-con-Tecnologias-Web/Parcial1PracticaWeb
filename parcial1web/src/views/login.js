import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginData from "./login.json";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); 

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    validatePassword(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setEmailValid(isEmailValid);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    const isPasswordValid = passwordRegex.test(password);
    setPasswordValid(isPasswordValid);
  };

  const changeStep = () => {
    if (step === 1) {
      if (emailValid) {
        setError("");
        setStep(2);
      } else {
        setError("El correo electrónico ingresado no es válido.");
      }
    } else if (step === 2) {
      if (passwordValid) {
        addUserToJSON();
      } else {
        setError("La contraseña ingresada no es válida.");
      }
    }
  };

  const generateRandomRole = () => {
    return Math.random() < 0.5;
  };

  const addUserToJSON = () => {
    if (!emailValid || !passwordValid) {
      setError("Credenciales inválidas. Por favor, verifica tus datos.");
      return;
    }

    console.log("Agregando usuario al JSON", formData);

    const newUser = {
      id: loginData.length + 1, 
      email: formData.email,
      password: formData.password,
      role: generateRandomRole(), 
    };

    loginData.push(newUser);

    navigate("/Home", { state: { userRole: newUser.role } });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          {error && <div className="alert alert-danger">{error}</div>}
          {step === 1 && (
            <form>
              <div className="form-group">
                <h2>Acceder</h2>
                <h4>Utiliza tu cuenta UniAlpes</h4>
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  className={`form-control ${emailValid ? "" : "is-invalid"}`}
                  value={formData.email}
                  onChange={handleEmailChange}
                />
                {!emailValid && (
                  <div className="invalid-feedback">
                    El correo electrónico ingresado no es válido.
                  </div>
                )}
              </div>
              <button type="button" className="btn btn-primary" onClick={changeStep}>
                Siguiente
              </button>
            </form>
          )}
          {step === 2 && (
            <form>
              <div className="form-group">
                <h4>{formData.email}</h4>
                <label>Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${passwordValid ? "" : "is-invalid"}`}
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
                {!passwordValid && (
                  <div className="invalid-feedback">
                    La contraseña ingresada no es válida.
                  </div>
                )}
              </div>
              <button type="button" className="btn btn-primary" onClick={changeStep}>
                Iniciar Sesión
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
