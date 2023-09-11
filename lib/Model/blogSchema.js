import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: String,
    description: String,
    imagelink: String,
    userid: String
  },
  {
    timestamps: true
  }
);

if (mongoose.models["Blogs"]) {
  delete mongoose.models["Blogs"];
}

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);

export default Blogs;
