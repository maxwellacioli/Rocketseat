import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import logo from '~/assets/images/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GoBarberLogo" />
      <form>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Registrar-se</Link>
      </form>
    </>
  );
}
