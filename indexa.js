const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); // Session management
const app = express();
const port = 4000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'CS41cDnNdkkLMkddUIf3cazOo72OkmwJWGchHukmnG9xkB3559iFIqaEfRD4TAJD', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend.html'));
});

// Route to handle form submissions
app.post('/add-data', (req, res) => {
    const { name, room, phn, complaint } = req.body;
    // Handle the data, e.g., save it to a database
    console.log(`Name: ${name}, Room: ${room}, Phone: ${phn}, Complaint: ${complaint}`);
    res.send('Complaint submitted successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
