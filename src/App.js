import logo from "./logo.svg";
import eye from "./images/eye.png";
import "./App.css";
import React, { useEffect, useState } from "react";
import AddImages from "./components/AddImages";
function App() {
  return (
    <div className="App">
      <div className="container">
        <div>
          <p className="title">Diabetic Retinopathy</p>
          <p className="title" style={{ float: "right" }}>
            Classifier
          </p>
        </div>
        <div className="image">
          <img src={eye} width={"200px"} style={{ color: "#7f7fd4" }} />
        </div>
      </div>

      <div className="content">
        <AddImages />
      </div>
    </div>
  );
}

export default App;
