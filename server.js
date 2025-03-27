const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;  // Make sure this port is free

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when accessing "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle the /complete-order route to show the license key
app.get('/complete-order', (req, res) => {
    const licenseKey = req.query.licenseKey; // Get the license key from the query parameter
    
    if (!licenseKey) {
        return res.status(400).send("License key not found.");
    }

    // Render the page with the license key
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Successful</title>
        </head>
        <body>
            <h1>Payment Successful!</h1>
            <p>Your License Key: <strong>${licenseKey}</strong></p>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
