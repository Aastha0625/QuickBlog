import express from "express";
import { addBlog , getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'),auth,addBlog);
blogRouter.get("/all", auth, getAllBlogs); // Get all blogs with authentication
blogRouter.get("/:blogId", auth, getBlogById); // Get blog by ID with authentication
blogRouter.post("/delete", auth, deleteBlogById); // Delete blog by ID with authentication
blogRouter.post("/toggle-publish", auth, togglePublish); // Toggle publish status with authentication
blogRouter.post("/add-comment",addComment); // Add comment without authentication
blogRouter.post("/comments", getBlogComments); // Get comments for a blog without authentication)

export default blogRouter;


