# AI eBook Creator

A full-stack MERN application that empowers users to create professional eBooks with cutting-edge AI technology.

## 🚀 Features

- **AI-Powered Outline Generation** — Generate complete book outlines using AI
- **Chapter Editor** — Write and edit chapters with a rich text editor
- **AI Chapter Content** — Generate chapter content using AI
- **Cover Image Upload** — Upload custom cover images for your eBooks
- **Export Options** — Export your eBook as PDF or Word document
- **Dashboard** — Manage all your eBooks in one place
- **Authentication** — Secure user registration and login with JWT

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React (Icons)
- DnD Kit (Drag and Drop)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Uploads)

## 📁 Project Structure
```
eBookCreator/
├── frontend/
│   └── eBookCreator/
│       ├── src/
│       │   ├── components/
│       │   │   ├── auth/
│       │   │   ├── cards/
│       │   │   ├── editor/
│       │   │   ├── landing/
│       │   │   ├── layout/
│       │   │   ├── modals/
│       │   │   └── ui/
│       │   ├── context/
│       │   ├── pages/
│       │   └── utils/
│       └── package.json
└── backend/
    ├── routes/
    ├── models/
    ├── controllers/
    ├── middleware/
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd eBookCreator
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend/eBookCreator
npm install
npm run dev
```

### 4. Open your browser
```
http://localhost:5173
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 8000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GEMINI_API_KEY` | Google Gemini AI API key |

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Home page with features |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |
| Dashboard | `/dashboard` | Manage eBooks |
| Editor | `/editor/:bookId` | Edit eBook |
| View Book | `/view-book/:bookId` | Preview eBook |
| Profile | `/profile` | User profile |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for creators
