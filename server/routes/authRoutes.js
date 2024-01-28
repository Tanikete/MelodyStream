const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController');


//middleware
router.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

router.get("/", test)
router.post("/register", registerUser)
router.post("/login", loginUser )
router.post("/logout", (req, res) => {
    // Perform any necessary operations for logout
    res.json({ success: true, message: "Logout successful" });
  });
router.get('/profile', getProfile)


module.exports = router;