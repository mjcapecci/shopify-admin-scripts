import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected...`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const disconnectDB = () => {
  mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
