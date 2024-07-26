const mongoose = require('mongoose');
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI;

mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected"))
    .catch(() => console.log("Error"))

const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);