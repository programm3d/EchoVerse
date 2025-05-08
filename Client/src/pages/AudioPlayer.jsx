import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const AudioPlayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    const fetchAudioEntry = async () => {
      try {
        const res = await axios.get(
          `https://echoverse-zvsj.onrender.com/entry/${id}/audio`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setEntry(res.data.entry);
      } catch (err) {
        console.error(err);
        alert("Failed to load entry. It might still be locked.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudioEntry();
  }, [id, auth.token]);

  if (loading) return <p>Loading...</p>;
  if (!entry) return <p>Entry not found or still locked.</p>;

  return (
    <div className="audio-player">
      <div className="nav">
        <p>EchoVerse</p>
        <button onClick={()=> navigate('/')}>Goto Home</button>
      </div>
      <div style={{ padding: "20px" }}>
        <h2>{entry.title}</h2>
        <p>Mood: {entry.mood}</p>
        <p>Created on: {new Date(entry.createdAt).toLocaleString()}</p>
        <p>Unlock date: {new Date(entry.unlockAt).toLocaleString()}</p>

        {entry.audioUrl ? (
          <>
            <audio controls src={entry.audioUrl} style={{ width: "100%" }} />
            <div style={{ marginTop: "20px" }}>
              <label>
                Reflect on this memory:
                <textarea
                  rows={4}
                  placeholder="Write your thoughts here..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </label>
            </div>
          </>
        ) : (
          <p>🔒 This entry is still locked. Come back later!</p>
        )}
      </div>
      <footer>
      <p>&copy; 2025 Pushan Sinha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AudioPlayer;
