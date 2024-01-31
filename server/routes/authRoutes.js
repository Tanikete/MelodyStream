const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser, resetPassword } = require('../controllers/authController');


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
router.post('/logout', logoutUser);
router.get('/profile', getProfile);
router.post('/reset-password', resetPassword);


module.exports = router;