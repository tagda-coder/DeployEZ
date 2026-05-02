import mongoose from "mongoose";

const deploymentSchema = new mongoose.Schema({
  repoUrl: String,
  status: {
    type: String,
    enum: ["queued", "deploying", "success", "failed"],
    default: "queued",
  },
  logs: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Deployment = mongoose.model("Deployment", deploymentSchema);
