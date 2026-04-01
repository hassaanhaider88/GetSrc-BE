import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findById(decode.userId).populate("uploadedMedia");
        if (!userData) {
            return res.status(404).json({ message: "User NoT Found.." })
        }
        req.user = userData;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Something Wents Wrong in Auth Middleware" })
    }
}

export default userAuth;