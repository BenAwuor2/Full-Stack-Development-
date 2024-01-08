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
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max:180,
    },
    visitDate: {
        type: Date,
        required: true,
    },
   
},
{
  timestamps: true, // Automatically add 'createdAt' and 'updatedAt' timestamps
});

const logEntry = mongoose.model('logEntry', logEntrySchema);
module.exports = logEntry;