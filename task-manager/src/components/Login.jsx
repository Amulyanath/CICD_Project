// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../services/authServices";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);   // calls axios login

      // At this point, login was successful (authServices already threw for errors)
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      navigate("/tasklist");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
