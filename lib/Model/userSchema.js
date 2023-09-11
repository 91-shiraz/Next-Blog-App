import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    number: Number
  },
  {
    timestamps: true
  }
);

if (mongoose.models["Users"]) {
  delete mongoose.models["Users"];
}

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
