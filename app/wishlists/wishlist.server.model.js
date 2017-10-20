const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    wishListName: {
        type: String,
        default: '',
        trim: true,
        required: 'Wish List Name cannot be blank'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    description: String,
});

WishlistSchema.set('toJSON', {
    virtuals: false
});


mongoose.model('Wishlist', WishlistSchema);
