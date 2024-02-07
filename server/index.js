const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err, 'MongoDB Connection Error'));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ error: 'Not logged in' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      res.json({ name: user.name });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });