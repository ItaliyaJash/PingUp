import mongoose from "mongoose";

const getMongoUri = () => {
    const rawUri = process.env.MONGODB_URL || process.env.MONGODB_URI;
    const uri = rawUri?.trim();

    if (!uri) {
        const message = 'Missing MongoDB connection string. Set MONGODB_URL or MONGODB_URI in your .env file.';
        console.error(message);
        throw new Error(message);
    }

    try {
        const parsedUri = new URL(uri);
        const hasDatabaseName = parsedUri.pathname && parsedUri.pathname !== '/';

        if (!hasDatabaseName) {
            parsedUri.pathname = '/pingup';
        }

        return parsedUri.toString();
    } catch {
        return uri.replace(/\/+$/, '') + '/pingup';
    }
};

const connectDB = async () => {
    const uri = getMongoUri();

    mongoose.connection.on('connected', () => console.log('Database connected'));
    mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err.message));

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.error('Check your MongoDB credentials and connection string in server/.env.');
        throw error;
    }
};

export default connectDB;
