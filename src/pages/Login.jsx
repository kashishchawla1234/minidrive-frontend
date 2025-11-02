import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      if (res.data.token) {
        login(res.data);
        navigate("/");
      } else {
        setError("Login failed: Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-[#fffaf5] to-[#f7ede2]">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 border border-[#e6b17e]/30">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#3a2e25]">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e6b17e]/60 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e6b17e]/60 focus:outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#e6b17e] text-white font-medium p-3 rounded-lg hover:bg-[#e2a66d] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
