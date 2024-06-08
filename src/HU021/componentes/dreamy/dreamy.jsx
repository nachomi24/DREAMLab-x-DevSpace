import React, { useState, useEffect } from "react";
import dreamyFeliz from "../../../assets/dreamy_feliz2.png";
import dreamyEmocionado from "../../../assets/dreamy_emocionado2.png";

const Dreamy = () => {
  const images = [dreamyFeliz, dreamyEmocionado];
  const [currentImage, setCurrentImage] = useState(dreamyFeliz);

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
  }, []);

  return (
    <div>
      <div className="bot-containerDreamyLogin">
        <img src={currentImage} alt="foto de dreamy" />
      </div>
    </div>
  );
};

export default Dreamy;
