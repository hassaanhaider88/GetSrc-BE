import axios from "axios";


const HandleUserSearchForImages = async (req, res) => {
    try {
        const searchQuery = req.query.q;

        const response = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
                params: {
                    query: searchQuery, // 🔍 Change this to anything (e.g., animals, tech)
                    per_page: 20,
                },
                headers: {
                    Authorization: `Client-ID ${process.env.ACCESS_KEY_FOR_UNSPLASH}`,
                },
            },
        );

        res.json({
            success: true,
            results: response.data.results
        });
    } catch (error) {
        res.status(500).json({ message: "Error Searching For Images", error })
    }
}

const HandleUserSearchForVideos = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const VideoRes = await axios.get("https://api.pexels.com/videos/search", {
            headers: { Authorization: process.env.PEXEL_API_KEY },
            params: { query: searchQuery, per_page: 20 },
        });

        res.json({
            success: true,
            results: VideoRes.data.videos
        });
    } catch (error) {
        res.status(500).json({ message: "Error Searching For Images", error })
    }
}

export { HandleUserSearchForImages, HandleUserSearchForVideos }