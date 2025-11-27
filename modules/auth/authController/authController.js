const authService = require("../authService/authService");

// Register
exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    // ✅ status check
    if (result.user.status !== "Approved") {
      return res.status(403).json({ message: `Account ${result.user.status}` });
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user status (Admin only)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedUser = await authService.updateStatus(req.params.id, status);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await authService.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};