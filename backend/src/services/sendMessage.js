import "dotenv/config";
// Download the helper library from https://www.twilio.com/docs/node/install
// Or, for ESM: import twilio from "twilio";
import twilio from "twilio";
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const myPhoneNumber = process.env.MY_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

async function createMessage(fullMessage) {
  const message = await client.messages.create({
    //contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
    body: fullMessage,
    //contentVariables: JSON.stringify({ 1: "22 July 2026", 2: "3:15pm" }),
    from: `whatsapp:${twilioPhoneNumber}`,
    to: `whatsapp:${myPhoneNumber}`,
  });

  console.log("Message sent:", message.sid);
}

export default createMessage;