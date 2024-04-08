const mongoose = require('mongoose');

// Define the schema for the BlogPost model
const blogPostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Export the BlogPost model
module.exports = BlogPost;