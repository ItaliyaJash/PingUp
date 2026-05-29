// import fs from 'fs';
// import imagekit from '../configs/imageKit';
// import Message from '../models/Message';

// // Create  an empty ongject to store SS Event connections
// const connections = {};

// // Controller function for the SSE endpoint
// export const sseController = (req, res) => {
//     const { userId } = req.params
//     console.log('New client connected : ', userId);

//     // set SSE headers
//     res.setHeader('Content-Type', 'text/event-stream')
//     res.setHeader('Cache-Control', 'no-cache')
//     res.setHeader('Connection', 'keep-alive')
//     res.setHeader('Access-Control-Allow-Origin', '*')

//     // Add the client-s response onject to the connections onject
//     connections[userId] = res

//     // Send an initial event to the client
//     res.write('log: Connection to SSE stream \n\n')

//     // Handle client disconnection
//     res.on('close', () => {
//         // Remove the client's response onject from the connections array
//         delete connections[userId];
//         console.log('client disconnected');
//     })
// }

// // Send Message
// export const sendMessage = async (req, res) => {
//     try {
//         const { userId } = req.auth()
//         const { to_user_id, text } = req.body;
//         const image = req.file

//         let media_url = ''
//         let message_type = image ? 'image' : 'text'

//         if(message_type === 'image') {
//             const fileBuffer = fs.readFileSync(image.path)
//             const response = await imagekit.upload({
//                 file: fileBuffer,
//                 fileName: image.originalname,
//             })
//             media_url = imagekit.url({
//                 path: response.filePath,
//                 transformation: [
//                     {quality: 'auto'},
//                     {format: 'webp'},
//                     {width: '1280'}
//                 ]
//             })
//         }

//         const message = await Message.create({
//             from_user_id: userId,
//             to_user_id,
//             text,
//             message_type,
//             media_url
//         })

//         res.json({ success: true, message })

//         // Send message to to_user_id using SSE

//         const messageWithUserData = await Message.findById(message.id).populate('from_user_id')

//         if(connections[to_user_id]) {
//             connections[to_user_id].write(`data: ${JSON.stringify(messageWithUserData)} \n\n`)
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }
 
// // Get Chat Messages
// export const getChatMessages = async (req,res) => {
//     try {
//         const { userId } = req.auth()
//         const { to_user_id } = req.body

//         const messages = await Message.find({
//             $or: [
//                 {from_user_id: userId, to_user_id},
//                 {from_user_id: to_user_id, to_user_id: userId},
//             ]
//         }).sort({created_at: -1})
//         // mark message as seen
//         await Message.updateMany({from_user_id: to_user_id, toString: userId}, {seen: true})

//         res.json({ success:true, messages })
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }







// import fs from 'fs';
// import imagekit from '../configs/imageKit.js';
// import Message from '../models/Message.js';

// // Create an empty object to store SSE Event connections
// const connections = {};

// // Controller function for the SSE endpoint
// export const sseController = (req, res) => {
//     const { userId } = req.params
//     console.log('New client connected : ', userId);

//     // set SSE headers
//     res.setHeader('Content-Type', 'text/event-stream')
//     res.setHeader('Cache-Control', 'no-cache')
//     res.setHeader('Connection', 'keep-alive')
//     res.setHeader('Access-Control-Allow-Origin', '*')

//     // Add the client's response object to the connections object
//     connections[userId] = res

//     // Send an initial event to the client
//     res.write('data: Connection to SSE stream established\n\n')

//     // Handle client disconnection
//     res.on('close', () => {
//         // Remove the client's response object from the connections object
//         delete connections[userId];
//         console.log('Client disconnected: ', userId);
//     })
// }

// // Send Message
// export const sendMessage = async (req, res) => {
//     try {
//         const { userId } = req.auth()
//         const { to_user_id, text } = req.body;
//         const image = req.file

//         let media_url = ''
//         let message_type = image ? 'image' : 'text'

//         if(message_type === 'image') {
//             const fileBuffer = fs.readFileSync(image.path)
//             const response = await imagekit.upload({
//                 file: fileBuffer,
//                 fileName: image.originalname,
//             })
//             media_url = imagekit.url({
//                 path: response.filePath,
//                 transformation: [
//                     {quality: 'auto'},
//                     {format: 'webp'},
//                     {width: '1280'}
//                 ]
//             })
//         }

//         const message = await Message.create({
//             from_user_id: userId,
//             to_user_id,
//             text,
//             message_type,
//             media_url
//         })

//         res.json({ success: true, message })

//         // Send message to to_user_id using SSE
//         const messageWithUserData = await Message.findById(message.id).populate('from_user_id')

//         if(connections[to_user_id]) {
//             connections[to_user_id].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`)
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }
 
// // Get Chat Messages
// export const getChatMessages = async (req, res) => {
//     try {
//         const { userId } = req.auth()
//         const { to_user_id } = req.body

//         const messages = await Message.find({
//             $or: [
//                 {from_user_id: userId, to_user_id},
//                 {from_user_id: to_user_id, to_user_id: userId},
//             ]
//         }).sort({created_at: -1})
        
//         // mark message as seen
//         await Message.updateMany({from_user_id: to_user_id, to_user_id: userId}, {seen: true})

//         res.json({ success: true, messages })
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }

// export const getUserRecentMessages = async (req, res) => {
//     try {
//         const { userId } = req.auth()
//         const messages = await Message.find({to_user_id: userId}.populate('from_user_id to_user_id')).sort({ created_at: -1 })

//         res.json({ success: true, messages })
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// }










import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Message from '../models/Message.js';

// Create an empty object to store SSE Event connections
const connections = {};

// Controller function for the SSE endpoint
export const sseController = (req, res) => {
    const { userId } = req.params
    console.log('New client connected : ', userId);

    // set SSE headers
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    })
    res.flushHeaders()

    // prevent the socket from timing out
    req.socket.setTimeout(0)

    // Close any existing connection for this user before adding the new one
    if (connections[userId] && connections[userId] !== res) {
        try {
            connections[userId].end()
        } catch (err) {
            console.warn(`Failed to close previous SSE connection for ${userId}:`, err.message)
        }
    }

    // Add the client's response object to the connections object
    connections[userId] = res

    // Send an initial event to the client
    res.write('event: connected\ndata: Connection to SSE stream established\n\n')

    // Heartbeat to keep the connection alive
    const heartbeat = setInterval(() => {
        if (!res.writableEnded) {
            res.write(': keep-alive\n\n')
        }
    }, 15000)

    const cleanup = () => {
        clearInterval(heartbeat)
        if (connections[userId] === res) {
            delete connections[userId]
        }
    }

    // Handle client disconnection
    res.on('close', () => {
        cleanup()
        console.log('Client disconnected: ', userId);
    })

    // Handle client error
    res.on('error', (error) => {
        cleanup()
        console.log('Client error: ', userId, error.message);
    })
}

// Send Message
export const sendMessage = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { to_user_id, text } = req.body;
        const image = req.file

        let media_url = ''
        let message_type = image ? 'image' : 'text'

        if(message_type === 'image') {
            const fileBuffer = fs.readFileSync(image.path)
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: image.originalname,
            })
            media_url = imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '1280'}
                ]
            })
            
            // Clean up uploaded file
            fs.unlinkSync(image.path)
        }

        const message = await Message.create({
            from_user_id: userId,
            to_user_id,
            text,
            message_type,
            media_url
        })

        // IMPORTANT: Get the populated message before sending response
        const messageWithUserData = await Message.findById(message._id).populate('from_user_id')

        // Send response to client first
        res.json({ success: true, message: messageWithUserData })

        // Send message to recipient using SSE
        if(connections[to_user_id]) {
            console.log(`Sending message to recipient: ${to_user_id}`);
            connections[to_user_id].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`)
        } else {
            console.log(`Recipient ${to_user_id} not connected to SSE`);
        }
        
        // Also send to sender for real-time update in their own chat
        if(connections[userId]) {
            console.log(`Sending message to sender: ${userId}`);
            connections[userId].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`)
        } else {
            console.log(`Sender ${userId} not connected to SSE`);
        }
        
    } catch (error) {
        console.log('Error in sendMessage:', error);
        res.json({success: false, message: error.message})
    }
}
 
// Get Chat Messages
export const getChatMessages = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { to_user_id } = req.body

        const messages = await Message.find({
            $or: [
                {from_user_id: userId, to_user_id},
                {from_user_id: to_user_id, to_user_id: userId},
            ]
        }).populate('from_user_id').sort({createdAt: 1})
        
        // mark message as seen
        await Message.updateMany({from_user_id: to_user_id, to_user_id: userId}, {seen: true})

        res.json({ success: true, messages })
    } catch (error) {
        console.log('Error in getChatMessages:', error);
        res.json({success: false, message: error.message})
    }
}

export const getUserRecentMessages = async (req, res) => {
    try {
        const { userId } = req.auth()
        const messages = await Message.find({to_user_id: userId}).populate('from_user_id to_user_id').sort({ createdAt: -1 })

        res.json({ success: true, messages })
    } catch (error) {
        console.log('Error in getUserRecentMessages:', error);
        res.json({success: false, message: error.message})
    }
}

// Helper function to broadcast message to all connected userss
export const broadcastMessage = (message, excludeUserId = null) => {
    Object.keys(connections).forEach(userId => {
        if (userId !== excludeUserId && connections[userId]) {
            try {
                connections[userId].write(`data: ${JSON.stringify(message)}\n\n`)
            } catch (error) {
                console.error(`Failed to send message to user ${userId}:`, error.message)
                // Remove broken connection
                delete connections[userId]
            }
        }
    })
}

// Get active connections count (optional - for debugging)
export const getActiveConnections = () => {
    return Object.keys(connections).length
}

// Debug function to see current connections
export const debugConnections = () => {
    console.log('Current SSE connections:', Object.keys(connections));
    return Object.keys(connections);
}
