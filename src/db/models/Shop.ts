import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ShopSchema;
