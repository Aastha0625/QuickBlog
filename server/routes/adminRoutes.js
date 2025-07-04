import express from 'express';
import { adminLogin ,getDashboardData,getAllBlogsAdmin,getAllComments,deleteCommentById,approveCommentById } from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/dashboard', auth, getDashboardData); // Get dashboard data with authentication
adminRouter.get('/blogs', auth, getAllBlogsAdmin); // Get all blogs with authentication
adminRouter.get('/comments', auth, getAllComments); // Get all comments with authentication
adminRouter.post('/delete-comment', auth, deleteCommentById); // Delete comment by ID with authentication
//adminRouter.post('/delete-blog', auth, deleteBlogById); // Delete blog by ID with authentication
adminRouter.post('/approve-comment', auth, approveCommentById); // Approve comment by ID with authentication    

export default adminRouter;