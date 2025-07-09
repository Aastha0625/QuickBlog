import express from "express";
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments, generateContent } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", auth,upload.single('image'), addBlog);
blogRouter.get("/all", getAllBlogs);

// This route for getting a single blog by its ID is correct.
blogRouter.get("/:id", getBlogById); 

blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

// This is your route for adding a NEW comment. The POST method is correct here.
blogRouter.post("/add-comment", addComment);

// The URL now matches what the frontend is calling: /api/blog/:id/comments
blogRouter.get("/:id/comments", getBlogComments); 

// This route is for generating content using the Gemini API.
blogRouter.post("/generate",auth,generateContent);


export default blogRouter;