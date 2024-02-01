// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Component/SideBar";
import Hotels from "./Component/Hotels";
import Rooms from "./Component/Rooms";
import HotelTable from "./Component/HotelTable";

const Home = () =>  <div>Contenu de la page d'accueil</div>;
const Page1 = () => (
  <div>
    Contenu de la page 1 </div>
);
const Page2 = () => <div>Contenu de la page 2</div>;
const Page3 = () => <div>Contenu de la page 3</div>;
const Page4 = () => <div>Contenu de la page 4</div>;

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ marginLeft: "0%", padding: "20px", width: "80%" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/page1" element={<Hotels />} />
            <Route path="/page2" element={<HotelTable />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/page4" element={<Page4 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
