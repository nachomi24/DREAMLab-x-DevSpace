import StatsA from './StatsA.jsx';
import Navbar from '../../src/HU022/Componentes/NavbarAdmin/Navbar.jsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const apiURLADMINR = "https://devspaceapi2.azurewebsites.net/api/info_reservaciones";

function App() {
  return (
    <div>
      <StatsA />
    </div>
  );
}

export default App;
