 ```markdown
# GetSrc – Upload & Host Images & Videos Instantly

GetSrc is a powerful, developer-focused platform to upload, host, and manage images and videos effortlessly. Whether you're building websites or web apps, GetSrc gives you instant CDN-powered links ready to embed.

![Banner](https://getsrc.com/banner-preview.png)

---

## 🌐 Live Demo

👉 [Visit GetSrc](https://getsrc.com/)

---

## 🚀 Features

- 🔼 Upload **JPG, PNG, GIF, SVG, MP4** files
- ⚡ Instantly get **CDN-optimized URLs**
- 🔐 User Authentication (Sign In / Sign Up)
- 👤 User Dashboard to manage uploaded media
- 🖼️ Live previews & file filtering
- 📦 Free plan with upgrade support
- 🌈 Clean UI/UX with Tailwind CSS
- 🧠 Built using React, Zustand, Express, MongoDB

---

## 🛠️ Tech Stack

| Frontend     | Backend | Storage               | Other                        |
| ------------ | ------- | --------------------- | ---------------------------- |
| React        | Express | MongoDB               | Zustand, React Router        |
| Tailwind CSS | Node.js | Cloudinary / ImageKit | React Helmet (SEO), Toastify |

---

## 📸 Screenshots

| Home Page                                | Dashboard                                     | Profile                                     |
| ---------------------------------------- | --------------------------------------------- | ------------------------------------------- |
| ![](https://getsrc.com/screens/home.png) | ![](https://getsrc.com/screens/dashboard.png) | ![](https://getsrc.com/screens/profile.png) |
```

## 📁 Folder Structure

```
getsrc/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Store/
│   ├── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── index.js

```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
npm install
# Set your MongoDB URI and Cloudinary keys in .env
npm run dev
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Visit `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in both `frontend` and `backend`:

### Backend `.env`

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=3000
```

### Frontend `.env`

```env
VITE_API_BASE=http://localhost:3000/api
```

---

## 📈 SEO & Accessibility

- ✅ Meta tags (Open Graph, Twitter, Canonical)
- ✅ Structured Data via `ld+json`
- ✅ Lighthouse score: 100 Performance, 100 Accessibility, 100 SEO

---

## 📦 Features To Add Next

- 🔁 Image compression
- 💬 Comment & Like system
- 🔗 Shareable public gallery links
- 🗃️ File tagging & categorization

---

## ✨ Author

Hassaan Haider – [@itsHassaanHaider](https://github.com/hassaanhaider88)

---

## 📜 License

This project is open-source under the MIT License.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on [GitHub](https://github.com/hassaanhaider88/GetSrc-BE)!
