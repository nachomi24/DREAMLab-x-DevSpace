import React, { useState } from "react";
import "../../HU010.css";

const Card = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    {
      title: "VIDEO WALL",
      description:
        "MANTENTE AL DÍA CON NUESTRA PANTALLA INTERACTIVA.",
    },
    {
      title: "SOCIAL NETWORKING",
      description:
        "EL ESPACIO IDEAL PARA HACER CONECCIONES.",
    },
    {
      title: "NO REQUIERE RESRVACIÓN",
      description:
        "ACCEDE AL ESPACIO SIN NINGÚN PERCANCE",
    },
  ];

  const nextCard = () => {
    setCurrentCard((prevCurrent) => (prevCurrent + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard(
      (prevCurrent) => (prevCurrent - 1 + cards.length) % cards.length
    );
  };

  return (
    <div className="box1HU010">
      <div className="CardHU010">
        <button className="prev_nextHU010" onClick={prevCard}>
          {"<"}
        </button>
        <div className="card-marginHU010">
          <h2>{cards[currentCard].title}</h2>
          <p>{cards[currentCard].description}</p>
        </div>
        <button className="prev_nextHU010" onClick={nextCard}>
          {">"}
        </button>
      </div>
      <a href="/reservar" className="ReservarAhoraHU010">
        RESERVAR AHORA
      </a>
    </div>
  );
};

export default Card;
