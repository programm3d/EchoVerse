import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [timeCapsule, setTimeCapsule] = useState(false);

  useEffect(() => {
    fetchEntries();
    fetchUserPrefs();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(
        "https://echoverse-zvsj.onrender.com/entry/my-entries",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setEntries(res.data.timeline);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserPrefs = async () => {
    try {
      const res = await axios.get(
        "https://echoverse-zvsj.onrender.com/users/time-capsule",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setTimeCapsule(res.data.timeCapsuleMode);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTimeCapsule = async () => {
    try {
      const res = await axios.patch(
        "https://echoverse-zvsj.onrender.com/users/time-capsule",
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setTimeCapsule(res.data.timeCapsuleMode);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home">
      {/* 🔹 Hamburger Menu with Checkbox Toggle */}
      <nav className="nav">
        <div className="logo">
          <p>EchoVerse</p>
        </div>

        {/* Invisible Checkbox */}
        <input type="checkbox" id="menu-toggle" className="menu-checkbox" />
        <label htmlFor="menu-toggle" className="hamburger">
          &#9776; {/* Hamburger Icon */}
        </label>

        {/* Navigation Links */}
        <div className="nav-links">
          <button onClick={() => navigate("/new-entry")}>➕ Add New</button>
          <button onClick={toggleTimeCapsule}>
            {timeCapsule ? "Disable" : "Enable"} Time Capsule
          </button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </nav>

      {/* Entries Section */}
      <h2>Your Audio Diaries</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id} className="entry-card">
            <p>
              <strong>{entry.title}</strong>
            </p>
            <p>Mood: {entry.mood}</p>
            <p>Unlocks: {new Date(entry.unlockAt).toLocaleString()}</p>
            <button onClick={() => navigate(`/entry/${entry.id}`)}>
              🔓 Open
            </button>
            <button onClick={() => console.log("Delete logic here")}>
              🗑 Delete
            </button>
          </div>
        ))
      )}
      <footer>
      <p>&copy; 2025 Pushan Sinha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
