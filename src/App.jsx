import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/modules/Home";
import Types from "./components/modules/Types";
import Pokemon from "./components/modules/Pokemon";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
        <Route path="/types/" element={<Types />} />
        <Route path="/types/:type" element={<Types />} />
      </Routes>
    </Router>
  );
}

export default App;
