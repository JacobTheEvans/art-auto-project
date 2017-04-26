var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recordSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  item: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Record", recordSchema);
