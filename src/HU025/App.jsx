import React from 'react';
import Menu from '../Navbar/Navbar'
import ReservationForm from './componentes/ReservationForm';

const App = () => {
  return (
    <div className="App">
        <Menu />
        <ReservationForm />
    </div>
  );
};

export default App;