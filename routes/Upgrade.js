const mongoose = require('mongoose');

const upgradeSchema = new mongoose.Schema({
  user: String,
  userlink: String,
  userimg: String,
  item: String,
  itemimg: String,
  valor: Number,
  price: Number,
  roll: String,
  result: String,
  raridade: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Upgrade', upgradeSchema);
