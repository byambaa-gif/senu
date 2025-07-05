import Message from '../models/Message.js';
import fetch from 'node-fetch'; // Only needed if you're using Node <18

export const handleMessage = async (msg) => {
  // 1. Save user's message
  await Message.create({ user: 'user', message: msg, isBot: false });

  // 2. Call external translation API
  const response = await fetch('https://senu-1t2l.onrender.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });

  let reply = 'No response from API';

  if (response.ok) {
    const data = await response.json();
    reply = data.translated_text || data.message || reply;
  } else {
    console.error('❌ API Error:', response.status);
  }

  // 3. Save bot's reply
  await Message.create({ user: 'bot', message: reply, isBot: true });

  // 4. Return the response to the caller (frontend or socket)
  return reply;
};
