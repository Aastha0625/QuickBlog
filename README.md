# QuickBlog

**QuickBlog** is an AI-powered blogging application designed to make content creation effortless and engaging. With a modern, responsive interface and seamless integration of AI tools, QuickBlog enables users to generate high-quality blog posts, interact with readers in real-time, and manage their content with ease.

## 🚀 Live Demo

Deployed at:  
https://quick-blog-sigma-five.vercel.app

## ✨ Features

- **AI-Powered Content Generation:** Effortlessly generate high-quality blog posts with AI assistance.
- **Modern User Interface:** Clean, responsive design built using React and Tailwind CSS.
- **Interactive Comments System:** Engage with your readers through real-time commenting.
- **Blog Management:** Create, edit, and manage your blog posts with an intuitive dashboard.
- **Social Media Integration:** Share your articles across popular social platforms.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

| Layer      | Technology                                                 |
|------------|-----------------------------------------------------------|
| Frontend   | React.js, Tailwind CSS, React Router, React Hot Toast, Moment.js |
| Backend    | Node.js, Express.js, MongoDB, Mongoose                    |
| Deployment | Vercel (Frontend), MongoDB Atlas (Database)               |

## 📦 Installation

### Prerequisites

- Node.js & npm
- MongoDB Atlas account

### 1. Clone the Repository
git clone https://github.com/your-username/quickblog.git
cd quickblog

### 2. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

JWT_SECRET="secretkey123"
GEMINI_API_KEY="AIzaSyB3SCmtjN7oCqHB5XfRCjstzU39EgpuaN0"

### 3. Install Dependencies
#### Backend
cd backend
npm install

#### Frontend
cd ../frontend
npm install

### 4. Run the Application
#### Backend
npm run server

#### Frontend
npm run dev

## 📝 Usage

1. **Sign Up / Login:** Create an account or log in to access the dashboard.
2. **Create a Blog Post:** Use the AI-powered editor to generate or write your content.
3. **Manage Posts:** Edit, delete, or update your blog posts from the dashboard.
4. **Engage:** Interact with your readers through the comments section.
5. **Share:** Use built-in social media integration to share your posts.


## 🌐 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Database:** Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
