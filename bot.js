const http = require('http'); 
const express = require('express');
const { Canvas } = require('canvas-constructor');
const { resolve, join } = require('path');
const { get } = require('snekfetch');
const fs = require('fs');
const superagent = require('superagent');
const app = express();
app.get("/", (request, response) => {
  console.log('https://uptimerobot.com');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

/*
  Special Thanks to:
  • God
  • DevYukine
  • iCrawl
  • DragonFire (xiao)

  Source code: https://github.com/DevYukine/Music-Bot
*/

/* Package
discord.js
simple-youtube-api
ytdl-core
node-opus
node-gyp
*/
// install 5 package ini aja

// Package (npm)
const { Client, Util } = require('discord.js');
const { prefix } = require("./config.json");
const Discord = require("discord.js");
const client = new Client({ disableEveryone: true });

// Youtube package (npm)
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const opus = require("node-opus");
const gyp = require("node-gyp");


const youtube = new YouTube(process.env.YT_API);
const queue = new Map();

// Console Log for bot
client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => console.log(`${client.user.tag} Mitake is ready!`));

    let activity = [
        `${prefix}help`,
        `Youtube`,
    ]

    setInterval(() => {
        let activities = activity[Math.floor(Math.random() * activity.length)];
        client.user.setActivity(activities, {type: "LISTENING"});

    }, 10000)


client.on('disconnect', () => console.log('I have Disconected'));
client.on('reconnecting', () => console.log('I am reconnecting now!'));
// end 

client.on("guildMemberAdd", async member => {
  
  let nickwel = member.user.username
  let batasnama = nickwel.length > 12 ? nickwel.substring(0.10) + "..." : nickwel;
  let membertag = member.user.tag;
  let memberCount = member.guild.memberCount;
    async function createCanvas() {
      
  let imageUrlPhoto = /\?size=2048$/g;
      
      let image = 'https://cdn.discordapp.com/attachments/639476238775484433/657895129901826098/WELCOME.jpg';
      
      let {body: background} = await superagent.get(image);
      let {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlPhoto, "?size=128"));
      
      return new Canvas(856,376)
      .setColor('#ffffff')
      .setTextFont('bold 30px sans-serif')
      .addImage(background, 0, 0, 856, 376)
      //av, posisi x, posisi y, ukuran icon, posisi icon terhadap ukuran(y), posisi icon terhadap ukuran (x)
      .addRoundImage(avatar, 100, 175, 150, 150, 75)
       .addText(`Anda adalah member ke-${memberCount}`, 280, 275)
      .addText(`${membertag}`, 280, 225)
      .toBufferAsync();
      
    }
  
  let channel = member.guild.channels.get('580031420123316255');
    channel.send(`Selamat datang di Seeep/Zeeeblogi オリジナル, <@${member.user.id}>. Mohon lihat channel <#580041790737088532>  untuk panduan bergabung di server ini.`, {
      
      
      files: [{
        attachment: await createCanvas(),
        name: `${member.user.username}image.jpg`
        
        }]
  
})
});
  

client.on("message", async message => {
  if (message.author.bot) return;
  let cmd = message.content;
  
  if(cmd === `${prefix}ping`) {
  
    const lmsg = await message.channel.send(`Tunggu sebentar`).then(m => m.delete());
    const pingE = new Discord.RichEmbed()
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))
        .setTitle('Ping!')
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        pingE.addField(`Latency :`, `${Math.floor(lmsg.createdAt - message.createdAt)}ms`)
        pingE.addField(`API :`, `${Math.round(client.ping)}ms`);
   
    message.channel.send(pingE);
    };

  
  
    if(cmd === `${prefix}help`) {
    
  const exampleEmbed = new Discord.RichEmbed()
	.setColor("#"+((1<<24)*Math.random()|0).toString(16))
	.setTitle('Help List')
	.setAuthor('Mitake', 'https://cdn.discordapp.com/avatars/587508883988152320/c87263d6e22201cfd4443ea503e18bda.png?size=1024')
	.setDescription(`\`PREFIX is ${prefix}\``)
	//exampleEmbed.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	//exampleEmbed.addField('Test', 'Ok')
	exampleEmbed.addBlankField()
	exampleEmbed.addField(`${prefix}play <judul lagu>`, 'Command untuk memutar musik `pastikan anda berada di voice channel terlebih dahulu`.', true)
      exampleEmbed.addBlankField()
	exampleEmbed.addField(`${prefix}stop`, 'Command untuk menghentikan musik `bot akan otomatis leave`.', true)
      exampleEmbed.addBlankField()
	exampleEmbed.addField(`${prefix}pause`, 'Command untuk menghentikan musik untuk sementara `bot tidak akan leave`.', true)
      exampleEmbed.addBlankField()
  exampleEmbed.addField(`${prefix}resume`, 'Command untuk melanjutkan musik yang telah di hentikan.', true)
      exampleEmbed.addBlankField()
	exampleEmbed.setImage('https://media.discordapp.net/attachments/639476238775484433/639746412279758858/ztenor.gif')
	//exampleEmbed.setTimestamp()
	exampleEmbed.setFooter('Credit by Martole#5237', 'https://cdn.discordapp.com/avatars/587508883988152320/c87263d6e22201cfd4443ea503e18bda.png?size=1024');

  return message.author.send(exampleEmbed)
            .then(() => {
                message.reply(`Cek DM ya sayang :relieved:`);
            })
            .catch(error =>{console.error(`Tidak dapat mengirim pesan melalui DM kepada ${message.author.tag}.\n`, error);
                message.reply(`Saya tidak bisa mengirim pesan via DM kepadamu :triumph:`);  
            });
  
  
  };
   
   

  
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.member.roles.find(role => role.hasPermission('BAN_MEMBERS'))) return;
//  if (message.author.id !== "482204979747356682") return;
  let cmd = message.content;
  
  if(cmd === `${prefix}Ksna76JKbbbvapt`)message.delete().catch(O_o=>{})
  else return;
  {
    try {
    await message.channel.send("Shutting down bot...")
    await client.destroy();
    //process.exit();
} catch(err) {
    message.channel.send(`ERROR : ${err.message}`);
}    
  }
});

// Music Modular Kampreto Kopipasto
client.on('message', async msg => { // eslint-disable-line
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
   
    client.user.setActivity('', {type: 'STREAMING'});
 
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(prefix.length)
    let filter = m => m.author.id === msg.author.id;
  
    if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    var embed = new Discord.RichEmbed()
                                .setTitle("🎺 Song Selection 🎻 ")
                                .setDescription(`${videos.map(video2 => `**${++index}** \`${video2.title}\` `).join('\n')}`)
                            .setColor("RANDOM")
                                .setFooter("Please provide a value to select one of the search results ranging from 1-10.")
 
                                 msg.channel.send(embed).then(msg => {msg.delete(10000)});
                    // eslint-disable-next-line max-depth
  
                    try {
                      // var response = await msg.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, 
                        var response = await msg.channel.awaitMessages(filter,{
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('No or invalid value entered, cancelling video selection.');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('To many invalid argumen, restart the command smh :imp:');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
        
      } else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);

      } else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
        
        } else if (command === 'q') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		var queueEm = new Discord.RichEmbed()
                  .setColor("RANDOM")
                  .setTitle("🎺 Queue 🎻 ")
                  .setDescription(`**Now Playing :** ${serverQueue.songs[0].title}`)
                  .addField(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`, "\u200b")
                  .setFooter('Credit by Martole#5237', 'https://cdn.discordapp.com/avatars/587508883988152320/c87263d6e22201cfd4443ea503e18bda.png?size=1024')
 
                 return msg.channel.send(queueEm);  
          /*
      var queueEm = new Discord.RichEmbed()
                  .setTitle("🎺 Queue 🎻 ")
                  .setDescription(`**Now Playing :** ${serverQueue.songs[0].title}`)
                  .addField(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
                  .setColor("RANDOM")
                  .setFooter("Please provide a value to select one of the search results ranging from 1-10.")
 
                 return msg.channel.send(queueEm);  
    */
    } else if (command === 'stop') {
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        msg.reply("**bot has been stopped !**");
        return undefined;
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
                        var embed = new Discord.RichEmbed()
                                .setTitle("Song Selection")
                                .setDescription(`⏸ Paused the music for you!`)
                            .setColor("RANDOM")
                                 msg.channel.send(embed)
        }
        return msg.channel.send('There is nothing playing.');
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
                    var embed = new Discord.RichEmbed()
                                .setTitle("Song Selection")
                                .setDescription(`▶ Resumed the music for you!`)
                            .setColor("RANDOM")
                                 msg.channel.send(embed)
        }
        return msg.channel.send('There is nothing playing.');
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
 
                 var embed = new Discord.RichEmbed()
                                .setTitle("Song Selection")
                                .setDescription(`🎵 \`Start playing:\` **${song.title}**`)
                            .setColor("RANDOM")
                                serverQueue.textChannel.send(embed).then(msg => {msg.delete(10000)});
}
 
client.login(process.env.TOKEN);
