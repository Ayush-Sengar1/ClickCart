const mongoose = require('mongoose');
const initdata = require("../JSON/data.js");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  category: String,
  gender: String
});


const Listing = mongoose.model("Listing", listingSchema);

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("Data is initialized");
};

initDB();

module.exports = Listing