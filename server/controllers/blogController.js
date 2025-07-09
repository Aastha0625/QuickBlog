import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import fs from "fs";
import imagekit from "../configs/imagekit.js";
import main from "../configs/gemini.js";

// export const addBlog = async (req, res) => {
//     try {
//         console.log("⛳ req.body.blog:", req.body.blog);
//         console.log("⛳ req.file:", req.file);
//         const { title, content, subTitle, category, isPublished } =
//         JSON.parse(req.body.blog);
//         const imageFile = req.file;

//         if (!title || !content || !subTitle || !category || !imageFile) {
//             return res.status(400).json({ success:false, message: "All fields are required" });
//         }

//         const fileBuffer = fs.readFileSync(imageFile.path);
//         const response = await imagekit.upload({
//             file: fileBuffer,
//             fileName: imageFile.originalname,
//             folder: "/blog",
//         });
        
    
        
//         const optimizedImageUrl = imagekit.url({
//             path: response.filePath,
//             transformation: [
//                 { quality: 'auto' },
//                 { format: 'webp' },
//                 { width: '1280' }
//             ]
//         });

//         const image = optimizedImageUrl;

//         await Blog.create({
//             title,
//             content,
//             subTitle,
//             category,
//             image,
//             isPublished
//         });
//         res.json({ success: true, message: "Blog added successfully" });
//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }

// };

export const addBlog = async (req, res) => {
     try {
    const { blog: blogData } = req.body;
    const imageFile = req.file; // multer should provide this if you're using `upload.single("image")`

    if (!blogData || !imageFile) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const blog = JSON.parse(blogData);
    const { title, subtitle, content, category, isPublished } = blog;

    if (!title || !subtitle || !content || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blog",
    });

    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const newBlog = await Blog.create({
      title,
      subtitle,
      content,
      category,
      isPublished,
      image: optimizedImageUrl,
      createdAt: new Date(),
    });

    console.log("Parsed blog:", blog);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            blogs: blogs, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params; 
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            blog: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save({validateBeforeSave: false});
        res.json({ success: true, message: "Blog publish status updated", isPublished: blog.isPublished });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        await Comment.create({
            blog: blogId,
            name,
            content 
        });
        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogComments = async (req, res) => {
    try {
        const { id } = req.params; 
        const comments = await Comment.find({ blog: id, isApproved: true }).sort({
            createdAt: -1
        });
        res.json({ success: true, comments });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await main(prompt + ' Generate a blog content for this topic in simple words');
        res.json({ success: true, content: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}