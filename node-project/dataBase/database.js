const mongoose = require("mongoose");

const connection = async (url) => {
  try {
    await mongoose.connect(url)
    
  } catch (err) {
    console.log("There is error in connecting to DATABASE", err);
  }
};

module.exports = { connection };
