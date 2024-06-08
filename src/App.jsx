import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HU004 from "./HU004/HU004.jsx";
import HU008 from "./HU008/HU008.jsx";
import HU009 from "./HU009/HU009";
import HU010 from "./HU010/HU010.jsx";
import HU0016_HU0017 from "./HU0016_HU0017/HU0016_HU0017";
import HU0019 from "./HU0019/HU0019";
import HU021 from "./HU021/HU021";
import HU022 from "./HU022/HU022";
import HU023 from "./HU023/HU023";
import HU024 from "./HU024/HU0024";
import HU024_1 from "./HU024_1/HU024_1";
import HU025 from "./HU025/HU025";
import HU026 from "./HU026/HU026";
import Error from "./error/error";
import Error_Pagina from "./error_pagina/error_pagina";

// Función para obtener rutas permitidas
const getPermittedRoutes = (isLoggedIn, userType) => {
  if (!isLoggedIn) {
    return ["/", "/espacios", "/open_spaces", "/garage_valley", "/login"];
  } else {
    switch (userType) {
      case "alumno":
        return [
          "/",
          "/espacios",
          "/open_spaces",
          "/garage_valley",
          "/reservar",
          "/perfil",
          "/reservar_normal",
        ];
      case "profesor":
        return [
          "/",
          "/espacios",
          "/open_spaces",
          "/garage_valley",
          "/reservar",
          "/perfil",
          "/reservar_normal",
          "/talleres",
        ];
      case "admin":
        return [
          "/admin/reservaciones",
          "/admin/videowall",
          "/admin/stats",
          "/videowall",
        ];
      default:
        return [];
    }
  }
};

// Componente de ruta protegida
const ProtectedRoute = ({ element, path }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const userType = localStorage.getItem("userType");
  const permittedRoutes = getPermittedRoutes(isLoggedIn, userType);

  if (!isLoggedIn && (path === "/reservar" || path === "/reservar_normal")) {
    return <Navigate to="/login" />;
  }

  if (!permittedRoutes.includes(path)) {
    return <Navigate to="/error" />;
  }

  return element;
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/reservar") {
      document.body.classList.add("global-background");
      document.body.classList.remove("espacio-background");
      document.body.classList.remove("videowall-background");
    } else if (location.pathname === "/videowall") {
      document.body.classList.add("videowall-background");
      document.body.classList.remove("espacio-background");
      document.body.classList.remove("global-background");
    } else if (
      location.pathname === "/espacios" ||
      location.pathname === "/open_spaces" ||
      location.pathname === "/garage_valley"
    ) {
      document.body.classList.add("espacio-background");
      document.body.classList.remove("global-background");
      document.body.classList.remove("videowall-background");
    } else {
      document.body.classList.remove("global-background");
      document.body.classList.remove("espacio-background");
      document.body.classList.remove("videowall-background");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute path="/" element={<HU0016_HU0017 />} />}
      />
      <Route
        path="/espacios"
        element={<ProtectedRoute path="/espacios" element={<HU008 />} />}
      />
      <Route
        path="/open_spaces"
        element={<ProtectedRoute path="/open_spaces" element={<HU010 />} />}
      />
      <Route
        path="/garage_valley"
        element={<ProtectedRoute path="/garage_valley" element={<HU009 />} />}
      />
      <Route
        path="/login"
        element={<ProtectedRoute path="/login" element={<HU021 />} />}
      />
      <Route
        path="/reservar"
        element={<ProtectedRoute path="/reservar" element={<HU004 />} />}
      />
      <Route
        path="/perfil"
        element={<ProtectedRoute path="/perfil" element={<HU0019 />} />}
      />
      <Route
        path="/admin/reservaciones"
        element={
          <ProtectedRoute path="/admin/reservaciones" element={<HU022 />} />
        }
      />
      <Route
        path="/admin/stats"
        element={<ProtectedRoute path="/admin/stats" element={<HU023 />} />}
      />
      <Route
        path="/admin/videowall"
        element={<ProtectedRoute path="/admin/videowall" element={<HU024 />} />}
      />
      <Route
        path="/videowall"
        element={<ProtectedRoute path="/videowall" element={<HU024_1 />} />}
      />
      <Route
        path="/reservar_normal"
        element={<ProtectedRoute path="/reservar_normal" element={<HU025 />} />}
      />
      <Route
        path="/talleres"
        element={<ProtectedRoute path="/talleres" element={<HU026 />} />}
      />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error_Pagina />} />
    </Routes>
  );
};

export default App;
