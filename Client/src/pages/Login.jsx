import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://echoverse-zvsj.onrender.com/users/login",
        form
      );
      login(res.data.token);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="logo">
        <p>EchoVerse</p>
      </div>
      <div id="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/signup"}>Signup</Link>.
        </p>
      </div>
      <footer>
      <p>&copy; 2025 Pushan Sinha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
