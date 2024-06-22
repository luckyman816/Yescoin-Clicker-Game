import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import Friends from "./page/Friends";
import Boost from "./page/Boost";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="quest" element={<Friends />} />
            <Route path='rankinglist' element={<Ranking />} />
            <Route path="boost" element={<Boost />} />
          </Route>
        </Routes>
        <ToastContainer />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
