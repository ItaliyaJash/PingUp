// import fs from 'fs'
// import imagekit from '../configs/imageKit.js';
// import Story from '../models/Story.js';
// import User from '../models/User.js';
// import { use } from 'react';
// import { inngest } from '../inngest/index.js';

// export const addUserStory = async (req, res) => {
//     try {
//         const { userId } = req.auth()
//         const { content, media_type, background_color } = req.body;
//         const media = req.file
//         let media_url = ''

//         // upload media to imagekit
//         if(media_type === 'image' || media_type === 'video') {
//             const fileBuffer = fs.readFileSync(media.path)
//             const response = await imagekit.upload({
//                 file: fileBuffer,
//                 fileName: media.originalname,
//             })
//             media_url = response.url
//         }

//         // create Story
//         const story = await Story.create({
//             user: userId,
//             content,
//             media_url,
//             media_type,
//             background_color
//         })

//         // schedule story deletion after 24 Hours
//         await inngest.send({
//             name: 'app/story.delete',
//             data: { storyId: story._id }
//         })

//         res.json({ success: true })
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }

// // Get User Stories
// export const getStories = async (req, res) => {
//     try {
//         const { userId } = req.auth()
//         const user = await User.findById(userId)

//         // User connections and followings
//         const userIds = [userId, ...user.connections || [], ...user.following || []]

//         const stories = await Story.find({
//             user: {$in: userIds}
//         }).populate('user').sort({ createdAt: -1 })

//         res.json({ success: true, stories });

//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }










import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Story from '../models/Story.js';
import User from '../models/User.js';
import { inngest } from '../inngest/index.js';

export const addUserStory = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { content, media_type, background_color } = req.body;
        const media = req.file
        let media_url = ''

        // Check if user exists first
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found. Please complete your profile setup first."
            });
        }

        // upload media to imagekit
        if(media_type === 'image' || media_type === 'video') {
            if (!media) {
                return res.status(400).json({
                    success: false,
                    message: "Media file is required for image/video stories"
                });
            }
            
            const fileBuffer = fs.readFileSync(media.path)
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: media.originalname,
            })
            media_url = response.url
            
            // Clean up uploaded file
            fs.unlinkSync(media.path)
        }

        // Validate content for text stories
        if (media_type === 'text' && (!content || content.trim() === '')) {
            return res.status(400).json({
                success: false,
                message: "Content is required for text stories"
            });
        }

        // create Story
        const story = await Story.create({
            user: userId,
            content: content || '',
            media_url,
            media_type,
            background_color
        })

        // schedule story deletion after 24 Hours
        await inngest.send({
            name: 'app/story.delete',
            data: { storyId: story._id }
        })

        res.json({ success: true, story })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, 
            message: error.message || "Failed to create story"
        })
    }
}

// Get User Stories
export const getStories = async (req, res) => {
    try {
        const { userId } = req.auth()
        
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // User connections and followings (all are strings matching User._id)
        const userIds = [userId, ...(user.connections || []), ...(user.following || [])]

        const stories = await Story.find({
            user: {$in: userIds}
        }).populate('user').sort({ createdAt: -1 })

        res.json({ success: true, stories });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, 
            message: error.message || "Failed to fetch stories"
        })
    }
}