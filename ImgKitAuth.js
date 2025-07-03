// example in Node.js + Express
import ImageKit from "imagekit";
import express from "express";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

router.get("/", (_, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams); // { signature, token, expire }
});

// app.listen(3000);

export default router;
