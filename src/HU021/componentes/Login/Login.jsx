import { useState, useEffect, useRef } from "react";
import axios from "axios";
import adperfil from "../../../assets/adperfil.png";

const Login = ({ setLoggedIn, setMatricula }) => {
  const [matriculita, setMatriculita] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });
  const [matricula, setMatriculaInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://dreamlabapidev.azurewebsites.net/api/loginNormal",
        {
          Matricula: matricula,
          Contrasena: password,
        }
      );

      if (response.data && response.status === 200) {
        const { Matricula, Tipo } = response.data;
        const normalizedTipo = Tipo.trim().toLowerCase();

        if (normalizedTipo === "admin") {
          localStorage.setItem("userType", normalizedTipo);
          window.location.href = "/admin/reservaciones";
        } else if (normalizedTipo === "profesor") {
          localStorage.setItem("userType", normalizedTipo);
          window.location.href = "/talleres";
        } else {
          localStorage.setItem("userType", normalizedTipo);
          window.location.href = "/reservar";
        }

        setLoggedIn(true);

        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        setMatriculita(Matricula);

        setMatricula(Matricula);
        localStorage.setItem("matricula", Matricula);

        setUserType(normalizedTipo);
        setErrorMessage("");
      } else {
        setErrorMessage("Matrícula o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage("Matrícula o contraseña incorrecta");
    }
  };

  useEffect(() => {
    if (isLoggedIn && matriculita) {
      fetch(
        `https://dreamlabapidev.azurewebsites.net/api/perfil/${matriculita}`
      )
        .then((response) => response.json())
        .then((data) => {
          const fotoUrl = data.Foto;
          document.documentElement.style.setProperty(
            "--right-avatar",
            `url(${fotoUrl})`
          );
        })
        .catch((error) => {
          console.error("Error al obtener la foto del perfil:", error);
        });
    }
  }, [isLoggedIn, matriculita]);

  return (
    <div className="HU004">
      <div className="login_formHU021">
        <h2>INICIA SESIÓN</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Matrícula:</label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatriculaInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "10px",
                color: "rgb(207, 58, 58)",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </p>
          )}
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
