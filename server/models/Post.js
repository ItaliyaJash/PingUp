// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//     // user: {type: String, ref: 'User', required: true},
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     content: {type: String},
//     image_urls: [{type: String}],
//     post_type: {type: String, enum: ['text', 'image', 'text_with_image'] , required: true},
//     // likes_count: [{type: String, ref: 'User'}],
//     likes_count: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// }, {timestamps: true, minimize: false})

// const Post = mongoose.model('Post', postSchema)

// export default Post;










import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // Changed to String to match Clerk user IDs
    user: { type: String, ref: 'User', required: true },
    content: {type: String},
    image_urls: [{type: String}],
    post_type: {type: String, enum: ['text', 'image', 'text_with_image'] , required: true},
    // Changed to String array to match Clerk user IDs
    likes_count: [{ type: String, ref: 'User' }],
}, {timestamps: true, minimize: false})

const Post = mongoose.model('Post', postSchema)

export default Post;