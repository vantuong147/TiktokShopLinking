const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// File path for storing webhook events
const eventsFilePath = path.join(__dirname, '../ServerData/WebhookEvents.json');

const saveEventToFile = (event) => {
    try {
        // Read existing events from file
        const fileData = fs.existsSync(eventsFilePath) ? fs.readFileSync(eventsFilePath, 'utf-8') : '[]';
        const events = JSON.parse(fileData);

        // Append the new event with a timestamp
        events.push({
            ...event,
            timestamp: new Date().toISOString()  // Add current timestamp in ISO format
        });

        // Write updated events back to the file
        fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
        console.log('Event with timestamp saved successfully.');
    } catch (error) {
        console.error('Error saving event to file:', error);
    }
};

// Define the webhook route
router.post('/', (req, res) => {
    const event = req.body;

    // Log the incoming event data
    console.log('Received webhook event:', event);

    // Save event to JSON file
    saveEventToFile(event);

    // Respond with a 200 status code to acknowledge receipt of the webhook
    res.status(200).send('Webhook received');
});
module.exports = {router};
