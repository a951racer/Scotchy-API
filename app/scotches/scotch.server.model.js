const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScotchSchema = new Schema({
  distillerName: {
    type: String,
    default: '',
    trim: true,
    required: 'Distiller cannot be blank'
  },
  flavor: {
    type: String,
    default: '',
    trim: true
  },
  age: Number,
  added: {
    type: Date,
    default: Date.now
  },
  style: {
    type: String,
    enum: ['Single Malt', 'Blended', 'Single Grain'],
    default: 'Single Malt'
  },
  region: {
    type: String,
    enum: ['Speyside','Highland','Islay','Island','Scotch','Lowland','Campbeltown','Other']
  },
  inStock: Boolean,
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  bottlingNotes: String,
  comment: String,
  notes: [{ note: String, dateAdded: {type: Date, default: Date.now} }],
  tastings: [{dateAdded: Date, location: String, rating: Number, thirdParty: Boolean, nose: String, palate: String, finish: String, comment: String}],
  wishLists: [String]
});

ScotchSchema.virtual('dramName').get(function() {
  const distiller = this.distillerName;
  const flavor = (this.flavor) ? ' ' + this.flavor:'';
  const age = (this.age) ? ' ' + this.age:'';
  return distiller + flavor + age;
});

ScotchSchema.virtual('rating').get(function() {
  var sum = 0;
  var count = 0;
  this.tastings.forEach(function(tasting) {
    if (!tasting.thirdParty) {
      sum += Number(tasting.rating);
      count++;
    }
  });
  if (count > 0) {
    var ratingRaw = sum / count;
    var rating = Math.round(ratingRaw);
  } else {
    var rating = 0;
  }
  return rating;
});

ScotchSchema.set('toJSON', {
  virtuals: true
});


mongoose.model('Scotch', ScotchSchema);
