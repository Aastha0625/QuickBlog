import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// Admin login controller
// This controller checks the admin credentials and returns a JWT token if valid
export const adminLogin = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Invalid credentials"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({success:true,token});

    } 
    catch (error) {
        res.json({success:false,message:"Something went wrong"});
    }
}

// Controller to get all blogs for admin
// This controller fetches all blogs from the database and returns them in descending order of creation date
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Controller to get all comments
// This controller fetches all comments from the database, populates the associated blog data, and
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('blog').sort({createdAt: -1});
        res.json({success: true, comments});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Controller to get dashboard data
// This controller fetches various statistics for the admin dashboard, including the count of blogs, comments
export const getDashboardData = async (req, res) => {
    try {
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const drafts = await Blog.countDocuments({isPublished: false});

        const dashboardData ={
            blogs, comments, recentBlogs, drafts
        }
        res.json({success: true, dashboardData});
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Controller to delete a comment by ID
// This controller deletes a comment from the database based on the provided ID
export const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message: "Comment deleted successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Controller to approve a comment by ID
// This controller updates the comment's approval status to true based on the provided ID
export const approveCommentById = async (req, res) => {
    try {
        const {id} = req.body;
         await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message: "Comment approved successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}