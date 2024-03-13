import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginData from "./login.json";
import { FormattedMessage, useIntl } from "react-intl";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Estado para controlar el paso actual

  const intl = useIntl(); // Obtiene el objeto intl para traducción

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
        setError(intl.formatMessage({ id: "login.emailInvalid" })); // Usa intl para obtener el mensaje
      }
    } else if (step === 2) {
      if (passwordValid) {
        addUserToJSON();
      } else {
        setError(intl.formatMessage({ id: "login.passwordInvalid" })); // Usa intl para obtener el mensaje
      }
    }
  };

  const generateRandomRole = () => {
    return Math.random() < 0.5; // Esto asignará true en un 50% de las veces y false en un 50% de las veces
  };

  const addUserToJSON = () => {
    if (!emailValid || !passwordValid) {
      setError(intl.formatMessage({ id: "login.invalidCredentials" })); // Usa intl para obtener el mensaje
      return;
    }

    console.log("Agregando usuario al JSON", formData);
    // Crear un nuevo objeto de usuario
    const newUser = {
      id: loginData.length + 1, 
      email: formData.email,
      password: formData.password,
      role: generateRandomRole(), // Modificamos acá para cambiar el rol
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
                <h2>
                  <FormattedMessage id="login.loginHeader" />
                </h2>
                <h4>
                  <FormattedMessage id="login.useUniAlpesAccount" />
                </h4>
                <label>
                  <FormattedMessage id="login.emailLabel" />
                </label>
                <input
                  type="email"
                  className={`form-control ${emailValid ? "" : "is-invalid"}`}
                  value={formData.email}
                  onChange={handleEmailChange}
                />
                {!emailValid && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="login.emailInvalidMessage" />
                  </div>
                )}
              </div>
              <button type="button" className="btn btn-primary" onClick={changeStep}>
                <FormattedMessage id="login.nextButton" />
              </button>
            </form>
          )}
          {step === 2 && (
            <form>
              <div className="form-group">
                <h4>{formData.email}</h4>
                <label>
                  <FormattedMessage id="login.passwordLabel" />
                </label>
                <input
                  type="password"
                  className={`form-control ${passwordValid ? "" : "is-invalid"}`}
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
                {!passwordValid && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="login.passwordInvalidMessage" />
                  </div>
                )}
              </div>
              <button type="button" className="btn btn-primary" onClick={changeStep}>
                <FormattedMessage id="login.loginButton" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;