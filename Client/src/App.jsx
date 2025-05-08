import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./pages/Signup";
import Home from "./pages/Home"; // your home/dashboard page
import Login from "./pages/login";
import AudioDiaryForm from "./pages/AudioDiaryForm";
import AudioPlayer from "./pages/AudioPlayer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
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
