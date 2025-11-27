const express = require("express");
const router = express.Router();
const { 
  register, 
  login, 
  getAllUsers, 
  updateStatus, 
  deleteUser   
} = require("../authController/authController");

const { protect, authorize } = require("../authMiddleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, (req, res) => res.json(req.user));
router.get("/users", protect, authorize("Admin"), getAllUsers);
router.patch("/status/:id", protect, authorize("Admin"), updateStatus);
router.delete("/delete/:id", protect, authorize("Admin"), deleteUser); 


module.exports = router;
