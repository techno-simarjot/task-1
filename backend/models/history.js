import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    expression: String,
    result: String,
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);