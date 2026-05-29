// import express from 'express'
// import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js'
// import { upload } from '../configs/multer.js'
// import { protect } from '../middlewares/auth.js'

// const messageRouter = express.Router();

// messageRouter.get('/:userId', sseController)
// messageRouter.post('/send', upload.single('image'), protect, sendMessage)
// messageRouter.post('/get', protect, getChatMessages)

// export default messageRouter











import express from 'express'
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js'
import { upload } from '../configs/multer.js'
import { protect } from '../middlewares/auth.js'

const messageRouter = express.Router();

// SSE endpoint - simplified approach for Clerk
messageRouter.get('/sse/:userId', (req, res) => {
    console.log('SSE endpoint hit for userId:', req.params.userId);
    
    const token = req.query.token;
    console.log('Token received:', token ? 'Yes (length: ' + token.length + ')' : 'No');
    
    // Basic token presence check - Clerk tokens are typically long
    if (!token || token.length < 20) {
        console.log('Invalid or missing token for SSE');
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('Unauthorized - Invalid token');
        return;
    }
    
    console.log('SSE connection authorized for user:', req.params.userId);
    sseController(req, res);
});

messageRouter.post('/send', upload.single('image'), protect, sendMessage)
messageRouter.post('/get', protect, getChatMessages)

export default messageRouter