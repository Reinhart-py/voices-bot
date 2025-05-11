import express from 'express';
import dotenv from 'dotenv';
import { BotWrapper } from './bot';
import { BotConfig } from './config';
import { TelegramVoices } from './telegram-voices';
import { VoicesLoader } from './voices-loader';
import * as fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json());

// Error logging helper
function handleError(err: any) {
  fs.appendFileSync('voices-bot.log', `${new Date()}: ${err}\n`);
}

(async () => {
  try {
    const config = new BotConfig();

    const telegramVoices = new TelegramVoices();
    const bot = new BotWrapper(config, telegramVoices);
    bot.init();

    const loader = new VoicesLoader(bot, telegramVoices);
    await loader.load();
    bot.bind();

    console.log("Bot initialized successfully.");
  } catch (err) {
    handleError(err);
  }
})();

// Just return a simple response on root
app.get('/', (_req, res) => {
  res.send('Bot is running from Netlify function.');
});

export default app;
