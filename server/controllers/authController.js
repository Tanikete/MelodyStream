const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({ error: 'Name is required' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'Password is required and should be min 6 characters long' });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is taken' });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword });
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'Invalid email or password' });
        }
        const valid = await comparePassword(password, user.password);
        if (valid) {
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'Strict' }).json(user);

                }
            );
        } else {
            res.json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error);
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) {
                    res.status(500).json({ error: 'Authentication failed' });
                } else {
                    const profile = {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    };
                    res.cookie('token', token, { httpOnly: true }); // Set the cookie in the response
                    res.json(profile);
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.json(null);
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }
        const hashedPassword = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    resetPassword
};
