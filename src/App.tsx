import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nossosprojetos" element={<Projects />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
