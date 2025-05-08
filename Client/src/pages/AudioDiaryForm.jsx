import React, { useState, useRef } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function AudioDiaryForm() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    mood: "",
    unlockAt: "",
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const uploadAndSubmit = async () => {
    if (!form.title || !form.mood || !form.unlockAt || !audioBlob) {
      alert("Please fill out all fields and record audio.");
      return;
    }

    try {
      // 1. Upload to Cloudinary
      const cloudData = new FormData();
      cloudData.append("file", audioBlob);
      cloudData.append("upload_preset", "ml_default");

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/djid9duyu/raw/upload",
        cloudData
      );

      const uploadedUrl = cloudRes.data.secure_url;
      const cloudinaryPublicId = cloudRes.data.public_id; // ✅ Extract Public ID

      // 2. Submit to backend with Cloudinary Public ID
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/entry/add-new", // Backend API
        {
          title: form.title,
          mood: form.mood,
          unlockAt: form.unlockAt,
          audioUrl: uploadedUrl,
          cloudinaryPublicId, // ✅ Send Public ID to backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Diary entry submitted!");
      setForm({ title: "", mood: "", unlockAt: "" });
      setAudioBlob(null);
      setAudioUrl("");
      navigate('/');
    } catch (error) {
      console.error(
        "Upload Error:",
        error.response ? error.response.data : error.message
      );
      alert("Something went wrong while uploading or submitting.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>🎙️ New Audio Diary Entry</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange}
        required
      />
      <br />
      <input
        type="text"
        name="mood"
        placeholder="Mood (😊)"
        value={form.mood}
        onChange={handleInputChange}
        required
      />
      <br />
      <input
        type="datetime-local"
        name="unlockAt"
        value={form.unlockAt}
        onChange={handleInputChange}
        required
      />
      <br />
      <br />
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      <br />
      {audioUrl && (
        <>
          <audio controls src={audioUrl}></audio>
          <br />
          <button onClick={uploadAndSubmit}>Submit Entry</button>
        </>
      )}
    </div>
  );
}

export default AudioDiaryForm;
