import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },
    sessional: {
      type: number,
    },
    final: {
      type: number,
    },
    grace: {
      type: Number,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

export const Mark = new mongoose.model("marks", markSchema);
