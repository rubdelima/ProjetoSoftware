import styles from "./index.module.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; 

function LoginForm({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      setErrorMessage('');
      localStorage.tokenAccess = response.data.access_token;
      localStorage.userType = response.data.access_token >= 1000 ? "adm" : "student"
      navigate('/home-page');
    } catch (error) {
      console.error(error);
      setErrorMessage('Usuário ou senha incorretos');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          data-cy="email"
          type="email"
          placeholder="exemplo@email.com"
          className={styles.emailInputField}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          data-cy="senha"
          type="password"
          placeholder="senha"
          className={styles.passwordInputField}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && (
        <p data-cy="error-message" className={styles.error}>
          {errorMessage}
        </p>
      )}
      <button data-cy="Entrar" type="submit" className={styles.loginButton}>
        Entrar
      </button>
    </form>
  );
}

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.tokenAccess) {
      navigate('/home');
    }
  }, [navigate]);

  const handleRegisterClick = () => {
    navigate('/users');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.topText}>Helpdesk</h1>
      <img className={styles.cinLogo} src='cinlogo.png'></img>
      <div className={styles.centralizedBox}>
        <h2 className={styles.topBoxTest}>Login</h2>
        <LoginForm navigate={navigate} />
          <button className={styles.textButton} onClick={handleRegisterClick}>
            Cadastre-se
          </button>
      </div>
    </div>
  );
}

export default Login;
