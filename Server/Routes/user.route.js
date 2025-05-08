const express = require("express");
const userModel = require("../Models/user.model");
const authMiddleware = require("../Middleware/authMiddleware");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

userRouter.get('/time-capsule', authMiddleware, async (req,res)=>{
  try{
    const user = await userModel.findById(req.userId);
    if(!user) return res.status(404).send({msg:'User not found'});
    let timeCapsuleMode = user.timeCapsuleMode;
    res.status(201).send({timeCapsuleMode});
  }catch(err){
    res.status(500).send({msg: err});
  }
})


userRouter.patch("/time-capsule", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.timeCapsuleMode = !user.timeCapsuleMode;
    await user.save();

    res.json({
      message: `Time Capsule Mode is now ${
        user.timeCapsuleMode ? "ON" : "OFF"
      }`,
      timeCapsuleMode: user.timeCapsuleMode,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = userRouter;
