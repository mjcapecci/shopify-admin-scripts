const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  upload_id: {
    type: String,
    required: true,
  },
  upload_total: {
    type: Number,
    required: true,
  },
  upload_completed: {
    type: Number,
    required: true,
  },
  queue_type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SettingsSchema = new mongoose.Schema({
  disable_upload_verify_step: {
    type: Boolean,
    default: false,
    required: true,
  },
  disable_upload_terms_disclaimer: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const ShopSchema = new mongoose.Schema({
  shop_name: {
    type: String,
    required: true,
    unique: true,
  },
  shop_token: {
    type: String,
    required: true,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  shop_settings: {
    type: SettingsSchema,
    default: {},
  },
  product_uploads: {
    type: [UploadSchema],
    default: [],
  },
});

module.exports = ShopSchema;
