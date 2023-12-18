// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passwordRoute = require('./routes/password.route');

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/password_strength', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Create an instance of Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// Route for password strength check
app.use('/api/password-strength', passwordRoute);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
