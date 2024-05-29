// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import HU004 from "./HU004/HU004.jsx";
// import HU008 from "./HU008/HU008.jsx";
import HU009 from "./HU009/HU009";
// import HU0016_HU0017 from "./HU0016_HU0017/HU0016_HU0017";
// import HU0019 from "./HU0019/HU0019";
/*
import HU022 from "./HU022/HU022";
import HU023 from "./HU023/HU023";
import HU025 from "./HU025/HU025";*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path="/" element={<HU0016_HU0017 />} /> */}
        {/* <Route path="/reservar" element={<HU004 />} /> */}
        {/* <Route path="/secciones" element={<HU008 />} /> */}
        <Route path="/garage_valley" element={<HU009 />} />
        {/* <Route path="/perfil" element={<HU0019 />} /> */}
     
        {/* <Route path="/admin2" element={<HU022 />} /> */}
        {/* <Route path="/stats" element={<HU023 />} /> */}
        
        {/* <Route path="/reservationform" element={<HU025 />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);