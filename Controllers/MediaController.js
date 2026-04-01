import Media from "../Models/MediaMode.js";
const cache = new Map();
export async function AllFilesData(req, res) {
    try {
        const { page } = req.query;
        if (!page) {
            return res.status(404).json({ success: false, message: "No files found" });
        }

        const cachedData = await cache.get("files");
        if (cachedData) {
            console.log("serving Cached..")
            const sendedRes = cachedData.slice((page - 1) * 40, page * 40);
            if (sendedRes.length < 1) {
                return res.status(404).json({ success: false, message: "No files found" });
            }
            return res.json({
                success: true,
                message: "Files fetched successfully",
                data: sendedRes,
            });
        }

        const data = (await Media.find({ IsPrivate: false })).toSorted(() => Math.random() - 0.5)
        if (!data) {
            return res.status(404).json({ success: false, message: "No files found" });
        }
        cache.set("files", data);
        const sendedRes = data.slice((page - 1) * 40, page * 40);

        res.json({
            success: true,
            message: "Files fetched successfully",
            data: sendedRes,
        });
    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}