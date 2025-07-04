import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import fs from "fs";
import imagekit from "../configs/imagekit.js"; 

export const addBlog = async (req, res) => { 
    try {
        const { title, description, subTitle, category, isPublished } = 
        JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all fields provided
        if (!title || !description || !subTitle || !category || !imageFile) {
            return res.status(400).json({ success:false,message: "All fields are required" });
        }

        //Upload image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer, // required
            fileName: imageFile.originalname, // required
            folder: "/blog", // optional
        })
        //optimization through imagekitUrl transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, // Automatically adjust quality
                {format: 'webp'},// Convert to WebP format
                {width : '1280'} // Resize to a maximum width of 1280px
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({
            title,
            description,
            subTitle,
            category,
            image,
            isPublished
        });
        res.json({ success: true, message: "Blog added successfully" });
    
        } 
        catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


    export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });;
        res.json({ success: true, blogs });
    }
    catch (error) { 
        res.json({ success: false, message: error.message });
        }
    }

    export const getBlogById = async (req, res) => {
        try {
            const {blogId} = req.params;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ success: false, message: "Blog not found" });
            }
            res.json({ success: true, blog });

        } catch (error) {
            res.json({ success: false, message: error.message });
        }
    }

    export const deleteBlogById = async (req, res) => {
        try {
            const { id } = req.body;
            await Blog.findByIdAndDelete(id);     
            
            //Delete all comments associated with the blog
            await Comment.deleteMany({ blog: id });
            
            res.json({ success: true, message: "Blog deleted successfully" });
        } catch (error) {
            res.json({ success: false, message: error.message });
        }
    }
    

    export const togglePublish = async (req, res) => {
        try {
            const { id } = req.body;
            const blog = await Blog.findById(id);
            blog.isPublished = !blog.isPublished;
            await blog.save();
            res.json({ success: true, message: "Blog publish status updated", isPublished: blog.isPublished });
        } catch (error) {
            res.json({ success: false, message: error.message });
        }
    }

    export const addComment = async (req, res) => {
        try {
            const {blog, name, comment} = req.body;
            await Comment.create({
                blog,name,content});
            res.json({ success: true, message: "Comment added for review" });
        } catch (error) {
            res.json({ success: false, message: error.message });
        }
    }

    export const getBlogComments = async (req,res) => {
        try {
            const {blogId} = req.body;
            const comments = await Comment.find({blog:blogId, isApproved: true}).sort({
                createdAt: -1})
            res.json({success: false, comments})

        } catch (error) {
            res.json({success:false, message:error.message})
        }
    }

    