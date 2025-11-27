const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ["Admin", "Nurse", "Doctor"], 
    default: "Nurse" 
  },
  wardName: { type: String },
  rankName: { type: String },
  phone: { type: String },
  gender: { type: String },
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Rejected"], 
    default: "Pending" 
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
