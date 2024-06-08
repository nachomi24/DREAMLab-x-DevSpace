import React, { useState, useEffect } from "react";
import "../../HU004.css";
import dreamy from "../../../assets/dreamy.png";
import dreamyBuscador from "../../../assets/dreamy_buscador.png";
import dreamyCelular from "../../../assets/dreamy_celular.png";
import dreamyFeliz from "../../../assets/dreamy_feliz.png";
import dreamyObservador from "../../../assets/dreamy_observador.png";

const Bot = () => {
  const images = [
    dreamy,
    dreamyBuscador,
    dreamyCelular,
    dreamyFeliz,
    dreamyObservador,
  ];
  const [currentImage, setCurrentImage] = useState(dreamy);

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
  }, []);

  return (
    <div>
      <div className="bot-containerHU004">
        <img src={currentImage} alt="foto de dreamy" />
      </div>
    </div>
  );
};

export default Bot;
