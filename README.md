QuickBlog
QuickBlog is an AI-powered blogging application designed to make content creation effortless and engaging. With a modern, responsive interface and seamless integration of AI tools, QuickBlog enables users to generate high-quality blog posts, interact with readers in real-time, and manage their content with ease.

🚀 Live Demo
Deployed at:
https://quick-blog-sigma-five.vercel.app

✨ Features
AI-Powered Content Generation: Effortlessly generate high-quality blog posts with AI assistance.

Modern User Interface: Clean, responsive design built using React and Tailwind CSS.

Interactive Comments System: Engage with your readers through real-time commenting.

Blog Management: Create, edit, and manage your blog posts with an intuitive dashboard.

Social Media Integration: Share your articles across popular social platforms.

Responsive Design: Optimized for desktop, tablet, and mobile devices.

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS, React Router, React Hot Toast, Moment.js
Backend	Node.js, Express.js, MongoDB, Mongoose
Deployment	Vercel (Frontend), MongoDB Atlas (Database)

📦 Installation
Prerequisites
Node.js & npm
MongoDB Atlas account

1. Clone the Repository
bash
git clone https://github.com/your-username/quickblog.git
cd quickblog

2. Set Up Environment Variables
Create a .env file in the root directory and add the following:
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_openai_api_key

3. Install Dependencies
Backend
bash
cd backend
npm install

Frontend
bash
cd ../frontend
npm install

5. Run the Application
Backend
bash
npm start

Frontend
bash
npm start

📝 Usage
Sign Up / Login: Create an account or log in to access the dashboard.

Create a Blog Post: Use the AI-powered editor to generate or write your content.

Manage Posts: Edit, delete, or update your blog posts from the dashboard.

Engage: Interact with your readers through the comments section.

Share: Use built-in social media integration to share your posts.

📁 Project Structure
text
quickblog/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
│
└── README.md
🌐 Deployment
Frontend: Deployed on Vercel

Database: Hosted on MongoDB Atlas

🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

📄 License
This project is licensed under the MIT License.
