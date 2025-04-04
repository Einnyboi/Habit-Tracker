const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose'); // Import Mongoose
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const path = require('path'); 
const app = express();
const PORT = 3000;

//mongoDB connection
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Middleware for session management
app.use(session({
    secret: 'hehehe', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const habitRoutes = require('./routes/habits');

app.use('/auth', authRoutes);
app.use('/', indexRoutes);
app.use('/habits', habitRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
