const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after “ai”. For example: “ai What is the capital of France?”`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`[ 🔍 ] » “${input}”`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\n› Create your own bot here using appstate\n› https://x3x-v0xr.onrender.com/', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('[ ❌ ] » An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
