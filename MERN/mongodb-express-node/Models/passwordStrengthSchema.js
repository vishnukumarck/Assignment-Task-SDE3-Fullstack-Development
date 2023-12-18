const mongoose = require('mongoose');

const passwordStrengthSchema = new mongoose.Schema(
  {
    password: String,
    steps: Number,
  },
  { collection: 'myPasswordCollection' }
);

const PasswordStrength = mongoose.model('PasswordStrength', passwordStrengthSchema);

module.exports = PasswordStrength;
