import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginData from "./login.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// https://my.api.mockaroo.com/login.json?key=16ada500

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
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&'+/])[A-Za-z\d@$!%*#?&'+/]{6,}$/;
    const isPasswordValid = passwordRegex.test(password);
    setPasswordValid(isPasswordValid);
  };

  const handleNextStep = () => {
    if (step === 1 && emailValid) {
      setStep(2);
    } else if (step === 2 && passwordValid) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    const user = loginData.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (user) {
      navigate("/Home", { state: { userRole: user.role } });
    } else {
      setError("Correo electrónico o contraseña incorrectos.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            {step === 1 && (
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
            )}
            {step === 2 && (
              <div className="form-group">
                <h2>{formData.email}</h2>
                <label>Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${
                    passwordValid ? "" : "is-invalid"
                  }`}
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
                {!passwordValid && (
                  <div className="invalid-feedback">
                    La contraseña ingresada no es válida.
                  </div>
                )}
              </div>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNextStep}
            >
              {step === 1 ? "Siguiente" : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
