import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is required."],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  //   bio: {
  //     type: String,
  //   },
  //   profileImage: {
  //     type: String,
  //     default: "https://ik.imagekit.io/s6rqx9267/man.png", // Image kit se Image ki url
  //   },
});

export default mongoose.model("User", userSchema);
