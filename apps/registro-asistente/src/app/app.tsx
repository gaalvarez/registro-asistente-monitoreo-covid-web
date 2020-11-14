import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';


import './app.scss';
import Home from './home/home';


export const App = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-content">
          <Route path="/" exact component={Home} />
          <Route path="/registro" exact component={Home} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
