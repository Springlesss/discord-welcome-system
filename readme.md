# Discord.js v14 Welcome System with Prefix Commands

made by Springles
---

## How to install

1. Make sure you have Node.js installed on your machine. You can download it from https://nodejs.org/.

2. Create a new Discord bot and obtain the token. You can do this by following the [Discord Developer Portal guide](https://discord.com/developers/docs/intro).

### Installation Steps

Clone the repository to your local machine.
```bash
git clone https://github.com/your-username/your-repository.git
```

Navigate to the project directory.
```bash
cd your-repository
```
Install the required dependencies using npm.

```bash
npm install discord.js
npm install simple-json-db
```
Configure the bot settings.

Open the config.json file.
Replace YOUR_BOT_TOKEN with your Discord bot token.

```json
{
  "token": "YOUR_BOT_TOKEN_HERE",
  "prefix": "!",
  "welcomeMessage": "Welcome to the server, {user}!",
  "welcomeChannel": "welcome"
}
```
Run the bot.

```bash
node .
```
You can now use the bot!
---
You can check the commands by using !help in your server.
