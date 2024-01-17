const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionFlagsBits,
  Permissions,
} = require("discord.js");
const config = require("./config.json");

const JSONdb = require("simple-json-db");
const db = new JSONdb("./database.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
});

client.on("ready", () => {
  console.log(`logged in as ${client.user.username}`);
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!welcome set")) {
    const [command, set, id, ...args] = message.content.slice(1).split(" ");
    switch (id) {
      case "here":
        if (
          message.member.permissions.has("Administrator")
        ) {
          const channelid = message.channel.id;
          db.set(`welcomechannelid-${message.guild.id}`, channelid);
          db.set(`guildsetupdone-${message.guild.id}`, true);
          message.reply("You've successfully set up the welcome system.");
        } else if (
          !message.member.permissions.has("Administrator") 
        ) {
          message.reply(
            "Looks like you dont have the correct permissions to use this command."
          );
        }
        break;

      case id:
        if (
          message.member.permissions.has("Administrator")
        ) {
          if (!message.guild.channels.cache.get(id)) {
            message.reply(
              "Your channel could not be found. Make sure you provided a valid ChannelID. If you dont know how to get a channel ID, please visit this link: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-]"
            );
          } else if (message.guild.channels.cache.get(id)) {
            db.set(`welcomechannelid-${message.guild.id}`, channelid);
            db.set(`guildsetupdone-${message.guild.id}`, true);
            message.reply("You've successfully set up the welcome system.");
            const channelid = message.channel.id;
          }
        } else if (
          !message.member.permissions.has("Administrator")
        ) {
            message.reply("Looks like you dont have the correct permissions to use this command.");
        }
        break;
    }
  }
});

client.on('messageCreate', message => {
    if (message.content === ('!welcome disable')) {
        if (message.member.permissions.has("Administrator")) {
            if (db.has(`guildsetupdone-${message.guild.id}`) == true) {
            db.delete(`welcomechannelid-${message.guild.id}`);
            db.delete(`guildsetupdone-${message.guild.id}`);
            db.delete(`guildwelcomemessage-${message.guild.id}`);
            message.reply('You have successfully disabled the welcome system.') 
            
            }
         else if (db.has(`guildsetupdone-${message.guild.id}`) == false){
            message.reply('Looks like the welcome system isnt set up in this server.'); 
        }
        
        } else if(!message.member.permissions.has("Administrator")) {
            message.reply("Looks like you dont have the correct permissions to use this command.");
        }
    }
})

client.on('messageCreate', message => {
    if (message.content.startsWith('!welcome edit')) {
        if (message.member.permissions.has('Administrator')) {
            const [command, sub, text, ...args] = message.content.slice(1).split(" ");
            db.set(`guildwelcomemessage-${message.guild.id}`, text);
            message.reply('Your welcome message has been saved!');
        } else {
            message.reply('Looks like you dont have the correct permissions to use this command.')
        }
    }
})

client.on('guildMemberAdd', member => {
    if (db.get(`guildsetupdone-${member.guild.id}`) == undefined) {
        return;
    } else if (db.get(`guildsetupdone-${member.guild.id}`) == true) {
        const welcomeChannel = db.get(`welcomechannelid-${member.guild.id}`);
        const welcomeMessage = db.get(`guildwelcomemessage-${member.guild.id}`);
        
        const welcomeEmbed = new EmbedBuilder()
        .setTitle(`**Welcome to the server ${member.user.displayName}!**`)
        .setDescription(welcomeMessage)
        .setColor('Green')
        .setThumbnail(member.user.avatarURL())
        .setFooter({ text: 'A new member joined!' })
        .setTimestamp()

        const welcomeChannelGet = member.guild.channels.cache.get(welcomeChannel);
       
        welcomeChannelGet.send({ embeds: [welcomeEmbed] })
    }
})

client.on('messageCreate', message => {
    if(message.content == '!help') {
       const embed = new EmbedBuilder()
       .setTitle('Help Section')
       .setDescription('**!welcome set [here|channelid]** - enables the welcome system \n **!welcome edit [welcomeMessage]** - set the welcome message \n **!welcome disable** - disables the welcome system')
       .setTimestamp()
       .setColor('#2b2d31')

       message.channel.send({ embeds: [embed] })
    }
})

client.login(config.token);
