import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/login";
import AudioDiaryForm from "./pages/AudioDiaryForm";
import AudioPlayer from "./pages/AudioPlayer";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Default route redirects to landing */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-entry"
            element={
              <ProtectedRoute>
                <AudioDiaryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entry/:id"
            element={
              <ProtectedRoute>
                <AudioPlayer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
