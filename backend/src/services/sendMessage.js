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

function truncateMessageBody(text, maxLength = 1500) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

async function createMessage(fullMessage) {
  if (!accountSid || !authToken || !twilioPhoneNumber || !myPhoneNumber) {
    throw new Error("Twilio environment variables are missing");
  }

  const safeMessage = truncateMessageBody(fullMessage);

  try {
    const message = await client.messages.create({
      body: safeMessage,
      from: `whatsapp:${twilioPhoneNumber}`,
      to: `whatsapp:${myPhoneNumber}`,
    });

    console.log("Message sent:", message.sid);
    return message;
  } catch (error) {
    console.error("Twilio message failed:", error.message);
    if (error?.code) {
      console.error("Twilio error code:", error.code);
    }
    throw error;
  }
}

export default createMessage;