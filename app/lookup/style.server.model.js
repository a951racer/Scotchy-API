const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StyleSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Style cannot be blank'
    }
});

StyleSchema.set('toJSON', {
    virtuals: false
});


mongoose.model('Style', StyleSchema);
