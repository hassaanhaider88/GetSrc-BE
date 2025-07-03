import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UserRouter from "./Router/UserRouter.js";
import ImgUploadRouter from "./Router/ImgUploader.js";
import VideoUploadRouter from "./Router/VideoUploader.js";
import  DBConnect  from './config/DB.js';
import { AllFilesData } from './Router/AllFilesData.js';
import ImgKitAuth from './ImgKitAuth.js'
import DeleteFile from './Router/DeleteFileRouter.js'
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


dotenv.config();
DBConnect()
var PORT = process.env.PORT || 3001;

// var corsOptions = {
//   origin: "http://localhost:5371",
//   optionsSuccessStatus: 200,
// };
app.use(cors());


app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/user", UserRouter);
app.use("/api/img-upload", ImgUploadRouter);
app.use("/api/upload-video",  VideoUploadRouter);
app.use('/api/files',AllFilesData)
app.use('/api/auth',ImgKitAuth)
app.use('/api/file',DeleteFile)

app.listen(PORT, () => {
  console.log(`Server Is Live On http://localhost:${PORT}`);
});
