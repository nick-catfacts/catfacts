var twilio = require('twilio');
// Find your account sid and auth token in your Twilio account Console.
var client = twilio( process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Send the text message.
client.sendMessage({
  to: '504-400-5519',
  from: process.env.TWILIO_PHONE_NUMBER,
  body: 'Hello from Twilio!'
});
