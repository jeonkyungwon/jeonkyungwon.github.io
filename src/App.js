import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./routes/Main";
import Career from "./routes/Career";
import Project from "./routes/Project";
import Introduce from "./routes/Introduce";
import Footer from "./routes/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/career" element={<Career />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/project" element={<Project />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
