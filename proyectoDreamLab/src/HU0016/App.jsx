import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';
import Tarjetas from './TarjetasT';
import { Helmet } from 'react-helmet';

function App() {
  const [datos, setDatos] = useState([]);
  //conseguir datos del API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/talleres', {
  mode: 'no-cors'})
      .then((res) => {
        setDatos(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (  
    <div className="container">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Mina:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Navbar />
      <Tarjetas datos={datos} />
    </div>
  );
}

export default App;
