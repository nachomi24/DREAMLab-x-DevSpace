import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Chat from "./componentes/chat/chat";
import Bot from "./componentes/dreamy/dreamy";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [matricula, setMatricula] = useState(""); // Estado de la matrícula

  console.log(matricula);

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Bot />
      <Chat setLoggedIn={setLoggedIn} setMatricula={setMatricula} />
    </div>
  );
};

export default App;
