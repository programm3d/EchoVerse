import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { auth, logout } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeCapsule, setTimeCapsule] = useState(false);

  useEffect(() => {
    fetchEntries();
    fetchUserPrefs();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/entry/my-entries", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setEntries(res.data.timeline);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPrefs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/time-capsule", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setTimeCapsule(res.data.timeCapsuleMode);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/entry/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchEntries();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTimeCapsule = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8080/users/time-capsule",
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
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/new-entry")}>➕ Add New</button>
        <button onClick={toggleTimeCapsule}>
          {timeCapsule ? "Disable" : "Enable"} Time Capsule
        </button>
        <button onClick={handleLogout}>🚪 Logout</button>{" "}
        {/* ✅ Logout Button */}
      </nav>

      <h2>Your Audio Diaries</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>{entry.title}</strong>
            </p>
            <p>Mood: {entry.mood}</p>
            <p>Unlocks: {new Date(entry.unlockAt).toLocaleString()}</p>
            <button onClick={() => navigate(`/entry/${entry.id}`)}>
              🔓 Open
            </button>
            <button onClick={() => deleteEntry(entry.id)}>🗑 Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
