import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import AdminPanel from "./pages/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
