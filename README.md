# 📚 EduPath - A Complete Course Management System

## 🌐 Live Website
[🔗 Visit Live Site](https://subscription-box-2faea.web.app/)

## 🎯 Project Purpose
**CourseMaster** is a full-stack course management system where users can:
- Browse available courses
- Enroll and un-enroll from courses
- Add, edit, manage their own created courses
- Track their enrolled courses
This project solidifies practical knowledge in **JWT Authentication**, **Firebase Auth**, **MongoDB CRUD**, **Axios Interceptors**, and more — all wrapped in a modern, recruiter-friendly UI.

## ✨ Key Features

### 🔐 Authentication
- Firebase authentication (Email/Password + Google & GitHub login)
- JWT token-based secure API communication
- Protected Routes (Auto redirect on login with redirection back)

### 📖 Course Functionalities
- Browse courses with pagination and filtering
- Enroll with seat limitation (e.g., 10 seats max)
- Unenroll by clicking "Enrolled" again
- One user can’t enroll in more than 3 courses simultaneously
- Prevent double enrollment or enrollment when not logged in

### 🧑‍💼 User Features
- Register & login securely
- Manage own created courses (Edit/Delete)
- View list of enrolled courses
- Add new course (Private route)
- Edit course (Private route)
- Dynamic enroll button with seat info

### 🖥️ UI & UX
- Fully responsive (Mobile, Tablet, Desktop)
- Beautiful color contrast and spacing
- Modern design with **shadcn/ui** components
- Custom animations using **framer-motion**
- Clean layout inspired by platforms like Coursera/Udemy

### 🔧 Technical Highlights
- **JWT Authentication** with token handling
- **Axios Interceptor** for secure API requests
- **React Router** for routing
- **React Hook Form** for validation
- **MongoDB Atlas + Express** backend
- **React Slick** for homepage banner slider
- **Framer Motion** for animations
- **React Toastify** for toast notifications
- **Environment variables** for Firebase & MongoDB credentials
- **Custom 404 Page**, Loading Spinners, and dynamic page titles

---
## 🚀 How to Run EduPath Locally

Follow these simple steps to get the EduPath project up and running on your machine:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/edupath.git
   cd edupath
Install Dependencies

bash
Copy
Edit
npm install
Configure Environment Variables

Create a .env file in the root folder.

Add your Firebase config, backend URLs, and other keys as needed.
Example:

ini
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_auth_domain
REACT_APP_BACKEND_URL=http://localhost:5000
Start the Backend Server (if backend is separate)

bash
Copy
Edit
cd backend
npm install
npm run dev
Make sure your MongoDB server is running and accessible.

Run the Frontend

bash
Copy
Edit
npm start
Open in Browser
Visit 👉 http://localhost:3000 to explore EduPath live locally!

