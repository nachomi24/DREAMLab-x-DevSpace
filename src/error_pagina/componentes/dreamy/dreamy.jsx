import React, { useState, useEffect } from "react";
import dreamyTriste from "../../../assets/dreamy_triste.png";
import dreamyTristeson from "../../../assets/dreamy_tristeson.png";
import dreamyDeprimido from "../../../assets/dreamy_deprimido.png";

const Dreamy = () => {
  const images = [dreamyTriste, dreamyTristeson, dreamyDeprimido];
  const [currentImage, setCurrentImage] = useState(dreamyTriste);

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
  }, []);

  return (
    <div>
      <div className="bot-containerErrorPagina">
        <img src={currentImage} alt="foto de dreamy" />
      </div>
    </div>
  );
};

export default Dreamy;
