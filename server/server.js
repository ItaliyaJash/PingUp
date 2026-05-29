import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js'
import { inngest, functions } from './inngest/index.js' 
import { serve } from 'inngest/express';
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';


const app = express();

try {
    await connectDB();
} catch (error) {
    console.error('Server startup aborted due to DB connection failure.');
    process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use(['/api/user', '/api/users'], userRouter)
app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter)
app.use('/api/messages', messageRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

