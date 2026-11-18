import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Application is running",
  });
});

connectDB();

app.use("/api/history", historyRoutes);

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

export default app;
