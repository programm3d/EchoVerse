const express = require("express");
const entryModel = require("../Models/entry.model");
const User = require("../Models/user.model");
const authMiddleware = require("../Middleware/authMiddleware");
const cloudinary = require("../Middleware/cloudinary.config");

const entryRouter = express.Router();

entryRouter.use(authMiddleware);

entryRouter.get("/test-route", (req, res) => {
  res.status(200).send({ msg: "Everything Working Fine" });
});

entryRouter.get("/:id/audio", async (req, res) => {
  const entryId = req.params.id;
  const userId = req.userId; // Set by authMiddleware

  try {
    const entry = await entryModel.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (entry.userId.toString() !== userId) {
      return res.status(403).json({ message: "Access denied: Not your entry" });
    }

    const user = await User.findById(userId);
    const now = new Date();

    // Time Capsule Mode logic
    if (user.timeCapsuleMode) {
      const unlockAfter1Year = new Date(entry.createdAt);
      unlockAfter1Year.setFullYear(unlockAfter1Year.getFullYear() + 1);

      if (now < unlockAfter1Year) {
        return res.status(403).json({
          message:
            "Locked by Time Capsule Mode – Available 1 year after creation",
        });
      }
    }

    // Standard unlock check
    if (now < entry.unlockAt) {
      return res.status(403).json({
        message: `🔒 Locked – Unlocks on ${entry.unlockAt.toDateString()}`,
      });
    }

    // Optional: Mark entry as unlocked
    if (!entry.isUnlocked) {
      entry.isUnlocked = true;
      await entry.save();
    }

    // ✅ Send audio URL
    return res.status(200).json({ entry });
  } catch (error) {
    console.error("Error fetching audio:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

entryRouter.post("/add-new", async (req, res) => {
  try {
    const { title, mood, audioUrl, unlockAt, cloudinaryPublicId } = req.body;

    if (!title || !mood || !audioUrl || !unlockAt) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEntry = new entryModel({
      userId: req.userId,
      title,
      mood,
      audioUrl,
      unlockAt: new Date(unlockAt),
      cloudinaryPublicId,
    });

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Entry created successfully", entry: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

entryRouter.get("/my-entries", async (req, res) => {
  try {
    const entries = await entryModel.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    const now = new Date();

    const formattedEntries = entries.map((entry) => {
      const isUnlocked = now >= new Date(entry.unlockAt);

      return {
        id: entry._id,
        title: entry.title,
        mood: entry.mood,
        createdAt: entry.createdAt,
        unlockAt: entry.unlockAt,
        status: isUnlocked ? "unlocked" : "locked",
      };
    });

    res.status(200).json({ timeline: formattedEntries });
  } catch (error) {
    console.error("Error fetching timeline:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

entryRouter.delete("/:id", async (req, res) => {
  let entryId = req.params.id;
  try {
    const entry = await entryModel.findById(entryId);

    if (!entry) return res.status(404).json({ message: "Entry not found" });

    // Ensure user owns the entry
    if (entry.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete file from Cloudinary
    if (entry.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(entry.cloudinaryPublicId, {
        resource_type: "raw",
      });
    }

    // Delete entry from MongoDB
    await entryModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Entry and Cloudinary file deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = entryRouter;
