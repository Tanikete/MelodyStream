const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//register endpoint
const registerUser = async (req, res) => {
    try {
        //check name is valid
        const { name, email, password } = req.body;
        if(!name) {
            return res.json({error: 'Name is required'})
        };
        //check password is valid
        if(!password || password.length < 6) {
            return res.json({error: 'Password is required and should be min 6 characters long'})
        };
        //check email is valid
        const exist = await User.findOne({email});
        if(exist) {
            return res.json({error: 'Email is taken'})
        };
        //hash password
        const hashedPassword = await hashPassword(password);
        //create user in db
        const user = await User.create({name, email, password: hashedPassword});
       
        return res.json(user);

    } catch (error) {
        console.log(error);
    }
}

//login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({error: 'No user found'});
        };
        //check if password is correct
        const valid = await comparePassword(password, user.password);
        if(valid) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!valid) {
            res.json({error: 'Invalid password'});
        };
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {} , (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

//logoutendpoint
const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
};

//reset password endpoint
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }
        // hash new password
        const hashedPassword = await hashPassword(newPassword);
        // update user's password in the database
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    resetPassword
}