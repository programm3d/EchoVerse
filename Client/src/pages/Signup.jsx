import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://echoverse-zvsj.onrender.com/users/sign-up",
        form
      );
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup">
      <div className="logo">
        <p>EchoVerse</p>
      </div>
      <div id="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>.
        </p>
      </div>
      <footer>
      <p>&copy; 2025 Pushan Sinha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
