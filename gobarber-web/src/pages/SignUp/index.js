import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import logo from '~/assets/images/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarberLogo" />
      <form>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Registrar</button>
        <Link to="/">Já possuo login</Link>
      </form>
    </>
  );
}
