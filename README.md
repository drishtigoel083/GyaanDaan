# GyaanDaan 📚 | Academic Resource Management System

**GyaanDaan** is a centralized platform designed to solve the problem of "volatile" academic resources. Notes shared on instant messaging apps like WhatsApp often get lost in chat history or become unavailable for download over time. This platform ensures students and teachers have 24/7 access to organized, permanent storage for study materials.

---

## 🚀 Live Demo

(https://gyaan-daan.vercel.app/)

---

## ✨ Features
- **Secure Authentication:** User login and registration using **JWT** for protected access.
- **Resource Management:** Teachers can upload PDFs and Images directly to the cloud.
- **Permanent Storage:** Integrated with **Cloudinary** to ensure files are never lost or expired.
- **Smart Filtering:** Search and filter notes by subject or date to find resources in seconds.
- **Responsive UI:** A clean, modern interface built with **Tailwind CSS** for seamless use on mobile and desktop.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Handling:** Multer, Cloudinary
- **Security:** JSON Web Tokens (JWT), Bcrypt.js

---

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone 
2. **Install Dependencies:**
   ```bash
   # Install for Backend
     cd backend && npm install
   # Install for Frontend
     cd frontend && npm install
3. **Environment Variables setup:**
     # Create a .env file in backend folder and one in frontend folder
     # Add your credentials
   ```bash
     # backend .env file
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     CLOUDINARY_CLOUD_NAME=your_name
     CLOUDINARY_API_KEY=your_key
     CLOUDINARY_API_SECRET=your_secret
     FRONTEND_URL_PROD=https://gyaan-daan.vercel.app
     FRONTEND_URL_DEV=http://localhost:5173

    #frontend .env file
    VITE_API_BASE_URL=http://localhostURL/api/v1
4. **Run the Application**
   Start Backend:

```Bash
# From the root directory
npm start
Start Frontend:

Bash
# From the frontend directory
npm run dev


         
     
   
