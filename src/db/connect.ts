import mongoose from 'mongoose';

const dbConns: any = { mainDB: null };
const models: any = { Shop: null };

const connectDB = async () => {
  try {
    const dbOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    dbConns.mainDB = mongoose.createConnection(
      process.env.DB_CONNECTION_STRING,
      dbOptions
    );

    models.Shop = dbConns.mainDB.model('Shop', require('../db/models/Shop'));
    console.log(`MongoDB connected...`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const disconnectDB = () => {
  mongoose.disconnect();
};

module.exports = { connectDB, models, disconnectDB };
