const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Region cannot be blank'
    }
});

RegionSchema.set('toJSON', {
    virtuals: false
});


mongoose.model('Region', RegionSchema);
