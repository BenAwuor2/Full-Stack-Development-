const mongoose = require("mongoose");

// # Log Entry

// * Tittle - Text
// * Description - Text
// * Comments - Text
// * Ratings - Scale 1-10
// * Image - Text - Url
// * Start Date - Datetime
// * End Date - Datetime
// * Latitude - Number
// * Longitude - Number
// * Created At - Datetime
// * Updated At - Datetime

const requiredNumber = {
    type: Number,
    required: true,
  };



const logEntrySchema = new mongoose.Schema({
    title: String,
    description: String,
    comments: String,
    image: String,
    ratings:  {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
    latitude: requiredNumber,
    longitude: requiredNumber,
    visitDate: {
        type: Date,
        required: true,
    },
    timestamps: true,
});

const User = mongoose.model('User', logEntrySchema);
module.exports = User;