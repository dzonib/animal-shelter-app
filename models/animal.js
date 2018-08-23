const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  shelter: {
    type: Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Animal = mongoose.model('Animal', AnimalSchema);