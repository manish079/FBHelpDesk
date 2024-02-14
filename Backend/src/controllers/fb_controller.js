const User = require("../model/user_model");

// Define a webhook endpoint for receiving messages from Facebook Messenger
exports.webhooks = (req, res) => {
  const body = req.body;

  // Verify that the request came from Facebook
  if (body.object === "page") {
    // Iterate over each entry
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0]; // We assume only one message per webhook event

      // Extract sender ID and message text
      const senderId = webhookEvent.sender.id;
      const messageText = webhookEvent.message.text;

      // Handle the message (you would implement your own logic here)
      handleMessage(senderId, messageText);
    });

    // Return a 200 OK status to acknowledge receipt of the webhook
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a 404 status if the request is not from Facebook
    res.sendStatus(404);
  }
};

// Define a webhook verification endpoint
exports.getWebHook = async (req, res) => {
  const VERIFY_TOKEN = "d71e32d9b9b664852b4ebf27d9e531e6"; // Change this to your own verify token
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Check if the mode and token are correct
  if (mode && token === VERIFY_TOKEN) {
    // Respond with the challenge token to verify the webhook
    res.status(200).send(challenge);
  } else {
    // Respond with a 403 Forbidden if verification fails
    res.sendStatus(403);
  }
};

// Function to handle incoming messages
function handleMessage(senderId, messageText) {
  // Your logic to handle incoming messages goes here
  console.log(`Received message from sender ${senderId}: ${messageText}`);
}
