import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_Connect_URI,);
    console.log(`✅ DB Connected`);
  } catch (error) {
    console.error("❌ Error in Connecting to DB:", error.message);
    process.exit(1); 
  }
};

export default DBConnect;
