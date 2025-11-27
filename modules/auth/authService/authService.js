const User = require("../authModel/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  
  async register({ username, password, confirmPassword, email, role, wardName, rankName, phone,gender }) {
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    const userExists = await User.findOne({ username });
    if (userExists) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      wardName,
      rankName,
      phone,
      gender,
      status: "Pending", // ✅ default status
    });

    await newUser.save();
    return { message: "User registered successfully" };
  }

  async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        wardName: user.wardName,
        rankName: user.rankName,
        phone: user.phone,
        gender:user.gender,
        status: user.status,
      },
    };
  }

  async getAllUsers() {
    return await User.find().select("-password");
  }

  async updateStatus(userId, status) {
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      throw new Error("Invalid status");
    }
    return await User.findByIdAndUpdate(userId, { status }, { new: true }).select("-password");
  }
  // ✅ Delete user
  async deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await User.findByIdAndDelete(userId);
    return { message: "User deleted successfully" };
  }
}

module.exports = new AuthService();
