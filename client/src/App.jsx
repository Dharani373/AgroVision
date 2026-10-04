import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyFarms from "./pages/MyFarms";
import Prediction from "./pages/Prediction";
import PredictionHistory from "./pages/PredictionHistory";
import Profile from "./pages/Profile";
import AgriculturalInsights from "./pages/AgriculturalInsights";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/farms" element={<MyFarms />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/prediction-history" element={<PredictionHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/insights" element={<AgriculturalInsights />} />
    </Routes>
  );
}

export default App;
