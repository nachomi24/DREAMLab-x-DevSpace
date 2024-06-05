import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HU004 from "./HU004/HU004.jsx";
import HU008 from "./HU008/HU008.jsx";
import HU009 from "./HU009/HU009";
import HU010 from "./HU010/HU010.jsx";
import HU0016_HU0017 from "./HU0016_HU0017/HU0016_HU0017";
import HU0019 from "./HU0019/HU0019";
import HU022 from "./HU022/HU022";
import HU023 from "./HU023/HU023";
import HU024 from "./HU024/HU0024";
import HU024_1 from "./HU024_1/HU024_1";
import HU025 from "./HU025/HU025";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/reservar") {
      document.body.classList.add("global-background");
      document.body.classList.remove("videowall-background");
    } else if (location.pathname === "/videowall") {
      document.body.classList.add("videowall-background");
      document.body.classList.remove("global-background");
    } else {
      document.body.classList.remove("global-background");
      document.body.classList.remove("videowall-background");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HU0016_HU0017 />} />
      <Route path="/reservar" element={<HU004 />} />
      <Route path="/secciones" element={<HU008 />} />
      <Route path="/garage_valley" element={<HU009 />} />
      <Route path="/perfil" element={<HU0019 />} />
      <Route path="/admin/reservaciones" element={<HU022 />} />
      <Route path="/stats" element={<HU023 />} />
      <Route path="/admin/videowall" element={<HU024 />} />
      <Route path="/videowall" element={<HU024_1 />} />
      <Route path="/reservationform" element={<HU025 />} />
      <Route path="/open_spaces" element={<HU010 />} />
    </Routes>
  );
};

export default App;
