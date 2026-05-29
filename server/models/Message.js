// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     // from_user_id: {type: String, ref: 'User', required: true},
//     // to_user_id: {type: String, ref: 'User', required: true},
//     from_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     to_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     text: {type: String, trim: true},
//     message_type: {type: String, enum: ['text', 'image']},
//     media_url: {type: String},
//     seen: {type: Boolean, default: false}
// }, {timestamps: true, minimize: false})

// const Message = mongoose.model('Message', messageSchema)

// export default Message;







import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // Changed to String to work with Clerk user IDs like "user_31FFYT1ScIthqHiQkAQHxiJE11D"
    from_user_id: {type: String, required: true},
    to_user_id: {type: String, required: true},
    text: {type: String, trim: true},
    message_type: {type: String, enum: ['text', 'image']},
    media_url: {type: String},
    seen: {type: Boolean, default: false}
}, {timestamps: true, minimize: false})

// Add indexes for better query performance
messageSchema.index({ from_user_id: 1, to_user_id: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model('Message', messageSchema)

export default Message;