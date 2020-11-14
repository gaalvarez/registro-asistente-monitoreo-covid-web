import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './home.scss';

/* eslint-disable-next-line */
export interface HomeProps { }

export const Home = (props: HomeProps) => {
  return (
    <div className="app">
      <header className="flex">
        {/* <Logo width="75" height="75" /> */}
        <h1>Bienvenido a Monitoreo-Covid App</h1>
      </header>
      <main>
        <h2>¿Deseas asistir a un evento precencial?</h2>


        <p>Registra tus datos y el evento al que deseas asistir</p>
        <ul className="resources">
          <li className="col-span-2">

            <Link className="resource flex" to="/registro">Registrarse a un Evento</Link>

          </li>
        </ul>
        <h2>Siguiente Pasos</h2>
        <p>Descarga nuestra aplicación y mantente informado de las alertas de contagio de las personas que asistieron</p>

      </main>
    </div>
  );
};

export default Home;
