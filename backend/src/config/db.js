const mongoose = require('mongoose');

// In-memory fallback storage if MongoDB is not locally running
const inMemoryStore = {
  requirements: [],
  counter: 1
};

let dbMode = 'uninitialized';

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gopratle_db';
  
  try {
    // Attempt Mongoose connection with 3-second timeout for rapid fallback
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
    dbMode = 'mongodb';
    console.log(`[Database] MongoDB successfully connected to: ${mongoURI}`);
  } catch (err) {
    console.warn(`[Database] Notice: MongoDB connection failed (${err.message}).`);
    console.warn(`[Database] Automatically falling back to resilient In-Memory Store for zero-config evaluation.`);
    dbMode = 'in-memory';
  }
};

const getDBStatus = () => ({
  mode: dbMode,
  connected: dbMode === 'mongodb' ? mongoose.connection.readyState === 1 : true,
  uri: dbMode === 'mongodb' ? (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gopratle_db') : 'In-Memory Emulation Store'
});

module.exports = {
  connectDB,
  getDBStatus,
  inMemoryStore,
  getDBMode: () => dbMode
};
