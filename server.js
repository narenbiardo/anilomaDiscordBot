const reportChannel = "reportChanneIDTemplate";
const Discord = require("discord.js");
const util = require("minecraft-server-util");

let client = new Discord.Client();
var commands = require("./src/commands.js");
var functions = require("./src/functions.js");
var asyncFunctionsCall = require("./src/asyncFunctionsCall.js");

const minecraftServerIp = "aniloma.serveminecraft.net";

client.on("message", message => {
	switch (message.content) {
		case "!ayuda":
			message.author.send(commands.ayuda());
			break;
		case "!estado":
			// Fetch a al ip del server para hacer una query
			util
				.query(minecraftServerIp)
				.then(response => {
					message.channel.send(
						commands.estadoOnline(
							response.onlinePlayers,
							response.maxPlayers,
							response.roundTripLatency
						)
					);
				})
				.catch(error => {
					message.channel.send(commands.estadoOffline());
				});
			break;
		case "!facciones":
			message.author.send(commands.facciones());
			break;
		case "!ip":
			message.channel.send(commands.ip());
			break;
		case "!mecanicas":
			message.author.send(commands.mecanicas());
			break;
		case "!bailar":
			message.channel.send(commands.bailar());
			break;
		case "!jugadores":
			//Fetch al ip del server para hacer una query y retornar la lista de jugadores
			functions.getPlayerList(message);
			break;
		default:
			// Fetch a al ip del server para hacer una query y saber si el jugador esta jugando
			if (message.content.startsWith("!jugador")) {
				if (message.content === "!jugador") {
					message.channel.send("Debes incluir el nick de un jugador.");
				} else {
					asyncFunctionsCall.jugadorChekMessageAuthorRoles(
						message,
						"[Adm.]",
						"[Cdor.]"
					);
				}
			}

			// Reporte con imagen
			else if (message.content.startsWith("!report")) {
				let image; //No se define para chequear si entró al forEach, por lo tanto si y existe una imágen
				if (message.content === "!report") {
					message.channel.send(commands.reportError());
				} else {
					message.attachments.forEach(attachment => {
						image = attachment.proxyURL;
						functions.sendReportImageEmbed(message, image, client);
						message.author.send("Su reporte ha sido enviado con éxito.");
					});
					// Reporte sin imagen
					if (image === undefined) {
						functions.sendReportTextEmbed(message, client);
						message.author.send("Su reporte ha sido enviado con éxito.");
					}
				}
			}
	}
});

//Al entrar un nuevo usuario al servidor se le agrega el rol "Calamardito"
client.on("guildMemberAdd", function (member) {
	// Fetch a un miembro de la guild
	let guild = client.guilds.cache.get("guildIDTemplate");
	let role = guild.roles.cache.find(role => role.name === "roleIDTemplate");
	member.roles.add(role).catch(console.error);
});

client.on("ready", () => {
	// Playing in my support server
	client.user.setActivity("escribe !ayuda", { type: "PLAYING" });
});

client.login("discordBotIDTemplate");
