const Discord = require('discord.js');
const exp = new Discord.Client;
const _ = require('underscore');
const commandDir = require('./cmds/cmds.json')
const cmds = commandDir.commands;
const config = require('./config.json')
const prefix = config.prefix;
var commands = [];
var commandsJSON = [];
var commandsReq = [];

for (let i = 0; i < cmds.length; i++) {
  commandsReq[i] = require(`./cmds/${cmds[i].cmd}.js`);
  commands[i] = `${cmds[i].cmd}`;
  if (cmds[i].admin) {
    commandsJSON[i] = {
      "cmd": cmds[i].cmd,
      "description": cmds[i].description,
      "admin": true
    }
  } else {
    commandsJSON[i] = {
      "cmd": cmds[i].cmd,
      "description": cmds[i].description,
      "admin": false
    }
  }
  console.log(`Imported ${cmds[i].cmd} Command.`)
}

exp.on('ready', () => {
  console.log('Ready!')
});

exp.on('message', (message) => {
  thisContent = message.content;
  thisChannel = message.channel;
  thisMember = message.member
  thisUser = message.author;
  if (!thisContent.startsWith(prefix)) return;
  if (thisUser.bot) return;
  var args = message.content.trim().slice(prefix.length).split(/ +/g);
  var cmd = args.shift().toLowerCase();

  for (let i = 0; i < commands.length; i++) {
    if (cmd == commands[i]) {
      commandsReq[i].run(thisChannel, thisContent, thisMember, message, Discord, prefix, commandsJSON);
      break;
    }
  }
  /* I'mma keep this here.
  if (cmd in commands) {
    if (commandsReq[cmd] != undefined && typeof commands[cmd].run == 'function') {
      commandsReq[cmd](thisChannel, thisContent, thisMember, message);
    }
  }
  */
})

exp.login(config.token)