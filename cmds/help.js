_ = require('underscore');
const embedColors = [0x0061ff, 0xff1e00, 0xe1ff00, 0x00ff9e, 0xff0061, 0xff9e00];
module.exports.run = async (thisChannel, thisContent, thisMember, thisMessage, Discord, prefix, commandsJson) => {
  Discord = require('discord.js');
  const embed = new Discord.RichEmbed();
  embed.setTitle('ExportBot Help Message')
    .setAuthor('ExportBot', 'https://i.imgur.com/H8CtKXL.png')
    .setColor(_.sample(embedColors))
    // .setDescription('desc')
    // .setFooter('footer', 'footer')
    // .setImage('image link')
    // .setThumbnail('thumbnail link')
    .setTimestamp()
    .setURL("https://github.com/Broken-Admin/");
  for (let i = 0; i < commandsJson.length; i++) {
    if ((thisMember.user.id != 289881772223889419 && thisMember.user.id != 314192584518008833) && commandsJson[i].admin == true) {} else {
      embed.addField(`${prefix}${commandsJson[i].cmd}`, commandsJson[i].description);
    }
  }
  // True / False defines if it's inline
  thisChannel.send({
    embed
  });
}