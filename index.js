require('http').createServer((req, res) => res.end(`Hay: ${client.users.cache.size} personas en el servidor de discord.`)).listen(3000);
const Discord = require("discord.js");
const {MessageAttachment} = require('discord.js')
const Canvas = require('canvas')
const client = new Discord.Client();
const Hastebin = require("hastebin-save");
const fs = require("fs");
const os = require('os');
const megadb = require('megadb');
const owner = new megadb.crearDB('owners');
const admins = new megadb.crearDB('admins');
const blacklist = new megadb.crearDB('blacklist');
const ram_1 = Math.ceil((os.totalmem() - os.freemem()) / 1000000);
const ram_2 = Math.ceil(os.totalmem() / 1000000);
const disbut = require('discord-buttons');
disbut(client);
let prefix = process.env.Prefix;
let version = process.env.Version;
const AntiSpam = require('discord-anti-spam')
const antiSpam = new AntiSpam({
	warnThreshold: 3, 
	kickThreshold: 5, 
	banThreshold: 7,

	maxInterval: 2000, 

	maxDuplicatesInterval: 60000, 

	warnMessage: '{@user}, deja de enviar spam', 

	kickMessage: '**{user_tag}** ha sido expulsado por enviar spam', 

	banMessage: '**{user_tag}** ha sido baneado por enviar spam', 

	errorMessages: true,
	
	maxDuplicatesWarning: 5, 

	maxDuplicatesKick: 10, 

	maxDuplicatesBan: 15, 
	
	deleteMessagesAfterBanForPastDays: 1, 
	
	exemptPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS', 'KICK_MEMBERS'], 
	ignoreBots: true, 

	verbose: true 

})

client.on('ready', () => {
   console.log(`¡Estoy vivo como ${client.user.tag}!`);
  function presence(){
  var status = [`⌨ ${prefix}ayuda ⌨`, `🔥${version}🔥`, "✨Creado por: HugoFastt#0001✨", `📋Estoy viendo a ${client.users.cache.size} embuclados📋`];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "dnd",
       activity: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}
  presence();
  setInterval(function(){
    var status = [`⌨ ${prefix}ayuda ⌨`, `🔥${version}🔥`, "✨Creado por: HugoFastt#0001✨", `📋Estoy viendo a  ${client.users.cache.size} embuclados📋`];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "dnd",
       activity: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}, 5000);
});


client.on('message', async (message)  => {
  if(message.content.startsWith("https://" || "http://")) {
message.author.delete();
message.channel.send("No puedes enviar enlaces.")
  }
  antiSpam.message(message)
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const comando = args.shift().toLowerCase();
if (!message.content.startsWith(prefix)) return; 
if (message.author.bot) return;
if(comando === "ayuda") {
  const ayuda = new Discord.MessageEmbed()
  .setTitle("📢📢**Ayuda**📢📢")
  .setColor("RANDOM")
  .setDescription("Lista de los comandos de ayuda:")
  .addField(prefix + "ayuda","Muestra este **mensaje**.")
  .addField(prefix + "comandos","Muestra la **lista** de comandos.")
  .addField(prefix + "ping","Muestra el **Retraso** que tiene el bot.")
  message.channel.send(ayuda);
}

if(comando === "comandos") {
const comandos = new Discord.MessageEmbed()
.setTitle("📂📂**Comandos**📂📂")
.setColor("RANDOM")
.setDescription("Lista de comandos:")
.addField(prefix + "ayuda","Muestra este **mensaje**.")
.addField(prefix + "comandos","Muestra la **lista** de comandos.")
.addField(prefix + "ping","Muestra el **Retraso** que tiene el bot.")
.addField(prefix + "botinfo","Muestra la **informacion** de el bot.")
.addField(prefix + "clear","Sirve para borrar pensajes de un canal.")
.addField(prefix + "ban","Sirve para banear gente.")
.addField(prefix + "kick","Sirve para expulsar gente.")
.addField(prefix + "nuke","DESTRUYE un canal de texto para borrar todos sus mensajes.")
.addField(prefix + "soyadmin","Te muestra a ti siendo admin.")
.addField(prefix + "avatar","Muestra la foto de perfil de alguien o la tuya.")
.addField(prefix + "addrole","Sirve para añadir un rol a alguien.")
.addField(prefix + "md","envia un mensaje al privado de alguien.")
message.channel.send(comandos);
}

if(comando === "ping") {
  let ping = Math.floor(message.client.ping);
  const pingembed = new Discord.MessageEmbed()
  .setTitle("Ping del bot")
  .setColor("ffff4d")
  .addField('Ping mensajes: ',Math.floor(message.createdTimestamp - Date.now())+'ms')
  message.channel.send(pingembed);
}
if(comando === "botinfo") {
const botinfo = new Discord.MessageEmbed()
.setAuthor("Cohete Bot", client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.addField("Developer", `HugoFastt#0001`)
.addField("Ayudantes", `Nadie`)
.addField("Servers", ` ${client.guilds.cache.size}`)
.addField("Usuarios", ` ${client.users.cache.size}`)
.addField("Ram", ` ${ram_1} MB `+ `${ram_2} MB`)
.addField("Lenguaje", " JavaScript")
.addField("Libreria", " Discord.js v12.5.3")
message.channel.send(botinfo);
}
if(comando === "kick") {
  let canal = client.channels.cache.get("926925787179925581")
const kickeado = message.mentions.users.first() || client.users.resolve(args[0]); 
const razon = args.slice(1).join(' ') || "Razon no definida."; 

if(!kickeado) return message.channel.send("No mencionaste a nadie para expulsar.") 
if(message.author === kickeado) return message.channel.send("No puedes expulsarte tu mismo.") 

if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No tienes permisos para expulsar personas.") 

if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("No tengo permisos para expulsar personas.") 


message.guild.member(kickeado).kick(razon)
const embedkick = new Discord.MessageEmbed()
.setTitle("**Alguien ha sido kickeado!**")
.setDescription(`**${kickeado.username} ha sido kickeado del servidor.**\n` +
`**Razón = ${razon}**\n` +
`**Moderador responsable = ${message.author.username}\n**`)
.setColor("RED")
.setTimestamp()
.setFooter("Bot desarrollado por HugoFastt")
message.channel.send(kickeado.username + " fue kickeado correctamente.")
canal.send(embedkick);
console.log(kickeado.username + " fue expulsado por " + message.author.username) 
}
if(comando === "ban") {
  //no furular :D
   let canal = client.channels.cache.get("926925787179925581")
const kickeado = message.mentions.users.first() || client.users.resolve(args[0]); 
const razon = args.slice(1).join(' ') || "Razon no definida."; 

if(!kickeado) return message.channel.send("No mencionaste a nadie para banear.") 
if(message.author === kickeado) return message.channel.send("No puedes banearte tu mismo.") 

if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes permisos para expulsar personas.") 

if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("No tengo permisos para expulsar personas.") 


message.guild.member(kickeado).ban(razon); 
const embedkick = new Discord.MessageEmbed()
.setTitle("**Alguien ha sido BANEADO!**")
.setDescription(`**${kickeado.username} ha sido kickeado del servidor.**\n` +
`**Razón = ${razon}**\n` +
`**Moderador responsable = ${message.author.username}\n**`)
.setColor("RED")
.setTimestamp()
.setFooter("Bot desarrollado por HugoFastt")
message.channel.send(kickeado.username + " fue baneado correctamente.")
canal.send(embedkick);
console.log(kickeado.username + " fue baneado por " + message.author.username) 
}
if(comando === "clear") {
 if (!message.guild) return message.channel.send('Este comando solo funciona en el servidor.')
    if (!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")) return message.reply(`No tienes permiso s para usar este comando.`)
    if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply("No tengo suficientes permisos ._.");
    if (!args[0] || (isNaN(args[0]) && !args[1])) return message.reply('Cuantos mensajes tengo que borrar. Especificalos.');
    let number = args[1] ? parseInt(args[1]) : parseInt(args[0]);
    if (!isNaN(number) && (number <= 100) && (number >= 1)) {
      await message.delete();
      switch (args[1]) {
        case 'users': {
          if (!args[3]) return message.channel.send("Mencione o ponga el ID de las personas a las que desea que se eliminen sus mensajes. \nk!clear usuarios <número> <menciones>`")
          const authors = message.mentions.users.size ? message.mentions.users.keyArray() : args.slice(3);
          const messages = await message.channel.messages.fetch({
            limit: number
          }, false);
          messages.sweep(m => !authors.includes(m.author.id));
          await message.channel.bulkDelete(messages, true);
          let thing = await message.channel.send(messages.size + " Los mensajes se eliminaron con éxito");
          thing.delete({ timeout: 5000 });
        }
        break;
        case 'bots': {
          const messages = await message.channel.messages.fetch({
            limit: number
          }, false);
          messages.sweep(m => !m.author.bot);
          await message.channel.bulkDelete(messages, true);
          let thing = await message.channel.send(messages.size + " Los mensajes se eliminaron con éxito");
          thing.delete({ timeout: 5000 });
        }
        break;
        case 'attachments': {
          const messages = await message.channel.messages.fetch({
            limit: number
          }, false);
          messages.sweep(m => !m.attachments.first());
          await message.channel.bulkDelete(messages, true);
          let thing = await message.channel.send(messages.size + " Los mensajes se eliminaron con éxito.");
          thing.delete({ timeout: 5000 });
        }
        break;
        case 'embeds': {
          const messages = await message.channel.messages.fetch({
            limit: number
          }, false);
          messages.sweep(m => !m.embeds[0]);
          await message.channel.bulkDelete(messages, true);
          let thing = await message.channel.send(messages.size + " Los mensajes se eliminaron con éxito");
          thing.delete({ timeout: 5000 });
        }
        break;
        case 'with': {
         
          const messages = await message.channel.messages.fetch({
            limit: number
          }, false);
         
          messages.sweep(m => !(new RegExp(args.slice(3).join(" "), "gmi").test(m.content)));
          await message.channel.bulkDelete(messages, true);
          let thing = await message.channel.send(messages.size + " Los mensajes se eliminaron con éxito");
          thing.delete({ timeout: 5000 });
        }
        break;
        default: {
          if(args[2]) return message.channel.send("Modo Invalido!");
          await message.channel.bulkDelete(number, true);
        }
      }
    } else {
      
      if (!isNaN(number)) {
        message.channel.send('Eso no es un numero!');
      } else if (number > 100) {
        message.channel.send('Solo puedo borrar mensajes menores que 100.');
      } else if (number < 1) {
        message.channel.send('Creo que 0 o menos no puedo borrar...');
      }
    }
}
if(comando === "nuke") {
 if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`> ¡Necesitas el permiso de **Gestionar canales**!`)
      let canal = message.channel;
      let pariente = message.channel.parentID;
      let posicion = message.channel.position;
      let nombre = message.channel.name;
      message.channel.delete()
      message.guild.channels.create(nombre, {
        type: "text",
        parent: pariente
      }).then(channel => {
        channel.setPosition(posicion)
        const embed = new Discord.MessageEmbed()
        .setTitle("**Canal NUEKADO**")
        .setColor("RANDOM")
        .setImage("https://media1.giphy.com/media/3ohuPBA3489AkQk1i0/giphy.gif")
        channel.send(embed)
      });
}
if(comando === "soyadmin") {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author 
message.channel.send("ESPERA... puede tardar unos segundos...")

let avatar = user.displayAvatarURL({ dynamic: false, size: 128, format: 'png' })

const canvas = Canvas.createCanvas(468, 415) 
const ctx = canvas.getContext('2d') 

let bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/750461925099307129/752473603127377961/IMG_20200907_051913_014.JPG') 
ctx.drawImage(bg, 0, 0) 

ctx.beginPath() 
ctx.arc(canvas.width/2, 70, 60, 0, Math.PI * 2) 
ctx.fillStyle = '#000' 
ctx.fill() 
ctx.stroke() 
ctx.closePath() 
ctx.clip() 
 
let imagen = await Canvas.loadImage(avatar) 
ctx.drawImage(imagen, 169, 10.7) 

let att = new MessageAttachment(canvas.toBuffer(), 'admin.png') 
message.channel.send(att) 
}
if(comando === "eval") {
if (message.author.id == "782279302028853248") {
async function Farsante(){
        let attachment = new Discord.MessageAttachment('https://i.imgur.com/TDkuovw.mp4', 'FARSANTE_COMO_TNFANGEL.mp4')
        return message.channel.send(attachment)
      }

async function esquelesquad(){
   let attachment = new Discord.MessageAttachment('https://media.discordapp.net/attachments/787059569221697536/799626391360110662/unknown.png', 'eskeleskuad.jpg')
        return message.channel.send(attachment)
}
async function nitro(){
        return message.channel.send("https://dis.cord.gifts/c/sBHtS7mXK95Ebz7h")
}
  async function enviar(mensaje) {
        return await message.channel.send(mensaje)
        }

        async function exec(codigo) {
        return await require("child_process").execSync(codigo)
        }
    
    
    
    
    
    
        function mayuscula(string) {
            string = string.replace(/[^a-z]/gi, '')
            return string[0].toUpperCase()+string.slice(1)
        }
    
  
        let tiempo1 = Date.now()
    
    
    
        const edit = new Discord.MessageEmbed()
        .setDescription(":stopwatch: Evaluando...")
        .setColor("#7289DA")
        message.channel.send(edit).then(async msg => { 
            try {
              let code = args.join(" ");
              let evalued = await eval(code);
              let tipo = typeof evalued||"Tipo no encontrado."
              if (typeof evalued !== 'string') evalued = require('util').inspect(evalued, { depth: 0, maxStringLength: 2000});
              let txt = "" + evalued;
    
   
    
              if (txt.length > 1500) {

                Hastebin.upload(`- - - - Eval - - - -\n\n${txt.replace(client.token, "Wow, un token")}`, link => {
            
                const embed = new Discord.MessageEmbed()
                .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
                .addField(":outbox_tray: Salida", `\`El codigo es muy largo, link:\` https://hastebin.com/${link}.js`)
                .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
                .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
                .setColor("#7289DA")
                msg.edit(embed);
                })
        
              } else { 
    

    
    
                const embed = new Discord.MessageEmbed()
                .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
                .addField(":outbox_tray: Salida", `\`\`\`js\n${txt.replace(client.token, "No quieres saber eso.")}\n\`\`\``)
                .addField(":file_folder: Tipo", `\`\`\`js\n${mayuscula(tipo)}\n\`\`\``, true)
                .addField(":stopwatch: Tiempo", `\`\`\`fix\n${Date.now() - tiempo1}ms\n\`\`\``, true)
                .setColor("#7289DA")
                msg.edit(embed);
              }
            } catch (err) {          
              let code = args.join(" ")
              const embed = new Discord.MessageEmbed()
              .setAuthor("Error en el eval", client.user.displayAvatarURL({dynamic : true}))
              .addField(":inbox_tray: Entrada", `\`\`\`js\n${code}\n\`\`\``)
              .addField(":outbox_tray: Salida", `\`\`\`js\n${err}\n\`\`\``)
              .addField(":file_folder: Tipo", `\`\`\`js\nError\n\`\`\``)
              .setColor("RED")
              msg.edit(embed);
          }
        })
        } else {
    

    
        const nopuedes = new Discord.MessageEmbed()
        .setDescription(":x: No puedes ejecutar este comando.")
        .setColor("RED")
        message.channel.send(nopuedes)
        }
}
if(comando === "avatar") {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 
    const avatar = new Discord.MessageEmbed()
.setDescription(`[Descargar Avatar](${user.displayAvatarURL({
        format: 'png',
        dynamic: true
    })})`)
.setImage(user.displayAvatarURL({dynamic: true, size : 1024 }))
.setColor("RANDOM")
.setFooter(`Avatar de solicitado por: ${message.member.displayName}`);
message.channel.send(avatar)
}
if(comando === "addrole") {
  if(!args) return message.channel.send('Escriba el nombre de un rol.');
let NombreRol = args.join(" ");

let role = message.guild.roles.cache.find("name", NombreRol);
if(!role)  return message.channel.send('Rol no encontrado en el servidor.');

const mencionado = message.mentions.users.first();
if(!mencionado) return message.channel.send("No se a encontrado persona")

mencionado.member.roles.add(role).catch(console.error);
}
if(comando === "md") {
  if (!message.guild) return message.channel.send('Te as parado a pensar que solo puede mencionar en un servidor?.')
  const mensajeado = message.mentions.users.first(); 
  if(!mensajeado) return message.channel.send("No mencionaste a nadie para que le envie mensaje.")
 const mensaje = args.slice(0).join(' ');
if(!mensaje) return menssage.channel.send("No pusistes ningun mensaje a enviar.")
const emisor = message.author;
const embed = new Discord.MessageEmbed()
.setTitle("Mensaje Directo! | Cohete Bot")
.setDescription(`Hola: ${mensajeado} ${emisor} te queria decir lo siguiente: ${mensaje}`)
.setAuthor(`${emisor}`)
.setColor("RANDOM")

const embed2 = new Discord.MessageEmbed()
.setDescription("✅| Se envio correctamente el mensaje.")
.setColor("RANDOM")

message.channel.send(embed2)

mensajeado.send(embed); 
  
}



if(comando === "destruirchohete") {
  let pillin = message.author;
   let canal = client.channels.cache.get("926925787179925581")
  message.channel.send("A donde vas pillin?🤨📷")

  canal.send(`Un pillin llamado ${pillin} a intentado destruir el bot XD`)
}

if(comando === "oiusers") {
 const embed2 = new Discord.MessageEmbed()
 .setTitle("Fundadora:")
 .setDescription("doctora.slone")
 .addField("Integrantes conocidos:", "Batman emo que rie#5626\nAlonso_229XD#3042\nDIO!!!#9708\n! Mr.Daiki-San#5732\n")
.setImage("https://i.imgur.com/3EK1iRP.png")
.setColor("RANDOM")
  message.channel.send(embed2)
 
}
});


client.login(process.env.Token);