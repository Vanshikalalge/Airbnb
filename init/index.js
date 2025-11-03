 const mongoose = require("mongoose");
 const initData = require("./data.js");
 const Listing = require("../models/listing.js");

 const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(() => {
    console.log("connected to DB");
});

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data.map((obj) => ({...obj , owner : "68e723819e6b540503c3fc1f"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

// Run only when you explicitly call
initDB();

