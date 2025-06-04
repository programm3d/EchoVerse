
# EchoVerse – Audio Diaries for the Future You

EchoVerse is a secure web app that allows users to record short voice messages and set them to unlock in the future — a digital time capsule for your thoughts, memories, or confessions.
> _“You’ll meet this voice again on...”_

---

## 🌟 Features

- 🎤 **Record and Save Audio**: Effortlessly capture your voice using your browser's microphone.
- ⏳ **Future Locking**: Set a specific date for your audio entries to unlock, creating a personal time capsule.
- 🔐 **Private & Secure**: Your recordings are encrypted, ensuring they remain accessible only to you.
- 📜 **Timeline View**: Review your locked and unlocked entries in a clear, chronological order.
- 🔔 **Unlock Reminders**: Easily identify which entries have become available since your last login.
- 🔁 **Audio Playback View**: Listen to your past entries and add optional reflection notes to them.
- 🕰️ **Time Capsule Mode**: Temporarily hide all your entries, even those already unlocked, for a set period of one year.
- 📱 **Mobile-Friendly UI**: Enjoy a seamless and responsive experience across all your devices.

---

## 🚀 Tech Stack

### Frontend
- React + Vite
- Axios
- React Router
- Context API
- HTML5 Audio Recording API

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (for audio uploads)

---

## 📁 Project Structure

echoverse/
├── client/                     # React frontend (Vite)  
│   ├── src/  
│   │   ├── components/         # Reusable components (Home, Player, Login, etc.)  
│   │   ├── AuthContext.js  
│   │   ├── App.jsx  
│   │   └── main.jsx  
│   └── ...  
├── server/                     # Node.js backend  
│   ├── Models/                 # Mongoose schemas for User and Entry  
│   ├── Routes/                 # API Routes for users and entries  
│   ├── Middleware/             # JWT auth middleware  
│   └── server.js  
└── README.md  


---

## 🔐 Authentication

- ✅ **Email + Password**: Secure registration and login functionality.
- ✅ **JWT-based Protected Routes**: Ensures only authenticated users can access specific parts of the application.
- ✅ **User-Specific Data Access**: Each user can only view and manage their own entries.

---

## 📦 API Endpoints

### Auth Routes
POST /user/sign-up   # Register a new user  
POST /user/login     # Log in and receive a JWT


### Entry Routes (Protected)

POST   /entry/create      # Create a new diary entry  
GET    /entry/my-entries  # Fetch all entries for the logged-in user  
GET    /entry/:id/audio   # Get the audio data for an unlocked entry  
DELETE /entry/:id        # Delete a specific entry  
PATCH  /user/toggle-mode  # Toggle the Time Capsule Mode on/off  


---

## 🧪 How to Run Locally

### Backend
```bash
cd server
npm install
node server.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```
  

Make sure to set the following environment variables in your .env file (create one in both the server and client directories):

# Server .env
```bash
MONGO_URI=your_mongo_uri
PORT=your_port
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```


# 📌 Future Improvements  
📧 Email notifications sent on the day an entry unlocks.  
📝 Ability to save reflection notes alongside played audio entries.  
🌙 Dark mode user interface option.  
🎧 Support for longer audio recordings via streaming.  

# Live Links (Deployed)

- [Backend](https://echoverse-zvsj.onrender.com/)
- [Frontend](https://echhoversse.netlify.app/)

# 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.




