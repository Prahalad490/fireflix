import React from "react";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoute from "./utils/authRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<HomeScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
