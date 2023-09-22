//dbConnection.js
const mongoose = require ('mongoose')
const config = require ('./config.js')

const dbConnection = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected.");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

module.exports = { dbConnection };
