import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Production from "./pages/Production";
import Photography from "./pages/Photography";
import Performance from "./pages/Performance";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producoes" element={<Production />} />
        <Route path="/projetoseoficinas" element={<Projects />} />
        <Route path="/fotografia" element={<Photography />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
