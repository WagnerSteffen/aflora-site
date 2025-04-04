import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Production from "./pages/Productions";
import Photography from "./pages/Photography";
import Performance from "./pages/Performance";
import About from "./pages/About";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página Home SEM layout */}
        <Route path="/" element={<Home />} />

        {/* Rotas COM layout */}
        <Route element={<Layout />}>
          <Route path="/producoes" element={<Production />} />
          <Route path="/projetoseoficinas" element={<Projects />} />
          <Route path="/fotografia" element={<Photography />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/sobre" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
