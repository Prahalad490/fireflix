import React from "react";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import MovieDetailScreen from "./pages/MovieDetailScreen";
import TvshowDetailScreen from "./pages/TvshowDetailScreen";
import ProfileScreen from "./pages/ProfileScreen";
import StreamScreen from "./pages/StreamScreen";
import ViewAllScreen from "./pages/ViewAllScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoute from "./utils/authRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/movie/details/:id" element={<MovieDetailScreen />} />
            <Route
              path="/tvshow/details/:id"
              element={<TvshowDetailScreen />}
            />
            <Route path="/:category/streaming/:id" element={<StreamScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/:category/view-all" element={<ViewAllScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
