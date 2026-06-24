import express from "express";
import History from "../models/history.js";

const router = express.Router();

// GET history
router.get("/", async (req, res) => {
  const history = await History.find().sort({ createdAt: -1 });
  res.json(history);
});

// POST history
router.post("/", async (req, res) => {
  const { expression, result } = req.body;

  const newEntry = await History.create({
    expression,
    result,
  });

  res.json(newEntry);
});

// DELETE all history
router.delete("/", async (req, res) => {
  await History.deleteMany({});
  res.json({ message: "History cleared" });
});

export default router;