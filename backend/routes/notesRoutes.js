
import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

/* =========================
   GET ALL NOTES OF USER
========================= */
router.get("/user/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET SINGLE NOTE
========================= */
router.get("/note/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   CREATE NOTE
========================= */
router.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newNote = new Note({
      title,
      content,
      userId,
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Create failed" });
  }
});

/* =========================
   UPDATE NOTE
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* =========================
   DELETE NOTE
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
