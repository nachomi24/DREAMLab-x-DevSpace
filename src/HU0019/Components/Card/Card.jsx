import React, { useState } from "react";
import "../../HU0019.css";

const Card = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    {
      title: "DIMENSION FORGE",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO A LA REALIDAD VIRTUAL (VR) Y LA IMPRESIÓN 3D. AQUÍ PUEDES TRABAJAR CON MODELOS VIRTUALES.",
    },
    {
      title: "NEW HORIZONS",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO AL USO Y DESARROLLO DE VR/AR. CUENTA CON UN HOLODECK.",
    },
    {
      title: "DEEP NET",
      description:
        "ESTE ES UN ESPACIO DONDE PUEDES REALIZAR PRUEBAS SIN VULNERAR LA SEGURIDAD DEL CAMPUS.",
    },
    {
      title: "GRAVEYARD",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO AL ARMADO DE COMPUTADORAS DESDE CERO, SERVIDORES, CLUSTERS, ETC.",
    },
    {
      title: "PBC FACTORY",
      description:
        "ESTE ES UN ESPACIO PERIFÉRICO DEDICADO AL DISEÑO Y CREACIÓN DE CIRCUITOS. AQUÍ PUEDES CONVERTIR TUS IDEAS EN OBJETOS TANGIBLES.",
    },
    {
      title: "THE MATRIX DIGITAL",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO A LAS APLICACIONES DIGITALES. AQUÍ PUEDES TRABAJAR CON MÁQUINAS VIRTUALES.",
    },
    {
      title: "PERIFÉRICOS",
      description:
        "ESTE ESPACIO INCLUYE EL ROBOTARIO, IoT, SMART THINGS, Y AMSART ROBOTICS.",
    },
    {
      title: "HACK-BATTLEFIELD",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO A LAS PRUEBAS DE SEGURIDAD, ATAQUES, FORTIFICACIONES.",
    },
    {
      title: "TESTING-LAND",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO A LAS PRUEBAS DE USABILIDAD, UX/UI. ",
    },
    {
      title: "WAR HEADQUARTER",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO A LA TOMA DE DECISIONES. SE RESERVA POR EL PROFESOR Y PERMITE VISUALIZAR INFORMACIÓN.",
    },
    {
      title: "BIOMETRICS FLEXIBLE HALL",
      description:
        "ESTE ES UN AUDITORIO FLEXIBLE DE TAMAÑO. AQUÍ PUEDES REALIZAR OBSERVACIÓN DE BIOMÉTRICOS, USAR SENSORES Y REALIZAR STREAMING.",
    },
    {
      title: "BEYOND-DIGITS",
      description:
        "ESTE ESPACIO ESTÁ DEDICADO A LA VISUALIZACIÓN DE DATOS Y MODELOS DE INFORMACIÓN. CUENTA CON EQUIPO PARA ANALÍTICA Y SIMULACIÓN.",
    },
    {
      title: "OPEN INNOVATION LAB",
      description:
        "ESTE ESPACIO ES SOLO PARA PROFESORES Y SOCIOS. ES UN ESPACIO DE COLABORACIÓN Y EXPLORACIÓN.",
    },
    // ... puedes agregar más tarjetas aquí
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
    <div className="box1019">
      <div className="Card019">
        <button className="button-prev-next-card" onClick={prevCard}>
          {"<"}
        </button>
        <div>
          <h2>{cards[currentCard].title}</h2>
          <p>{cards[currentCard].description}</p>
        </div>
        <button className="button-prev-next-card" onClick={nextCard}>
          {">"}
        </button>
      </div>
      <button className="ReservarAhora019">RESERVAR AHORA</button>
    </div>
  );
};

export default Card;
