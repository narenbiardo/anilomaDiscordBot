const reportChannel = "reportChanneIDTemplate";
const minecraftServerPort = 25565;
const minecraftServerIp = "aniloma.serveminecraft.net";

let Discord = require("discord.js");
var commands = require("./commands.js");
const util = require("minecraft-server-util");

module.exports = {
	chekMemberHasAnyRole: async function (message, roleName1, rolName2) {
		//Retorna true si el miembro tiene el rol
		if (rolName2 === undefined) {
			rolName2 = "";
		}
		let memberHasAnyRole = message.member.roles.cache.some(
			role => role.name === roleName1 || role.name === rolName2
		);
		console.log("memberID: " + message.member);
		console.log("has role?: " + memberHasAnyRole);
		return memberHasAnyRole;
	},
	sendReportImageEmbed: function (message, image, client) {
		client.channels.cache
			.get(reportChannel)
			.send(commands.reportImage(message, image))
			.then(sentEmbed => {
				sentEmbed.react("✔️");
				sentEmbed.react("❌");
			});
		return image;
	},
	sendReportTextEmbed: function (message, client) {
		client.channels.cache
			.get(reportChannel)
			.send(commands.reportSimple(message))
			.then(sentEmbed => {
				sentEmbed.react("✔️");
				sentEmbed.react("❌");
			});
	},
	findPlayerOnline: function (message) {
		let player = message.content.substr(message.content.indexOf(" ") + 1); //Quita la primer palabra (!jugador)
		util
			.queryFull(minecraftServerIp, {
				port: minecraftServerPort,
			})
			.then(response => {
				let playerList = response.players.map(players => players.toLowerCase()); //Setea todo el array de players a minuscula
				if (playerList.includes(player.toLowerCase())) {
					message.channel.send(commands.jugador(player));
				} else {
					message.channel.send(
						`El jugador ${player} no existe o no se encuentra conectado.`
					);
				}
			})
			.catch(error => {
				message.channel.send(`Fallo al conectar con el servidor.`);
			});
	},
	getPlayerList: function (message) {
		util
			.queryFull(minecraftServerIp, {
				port: minecraftServerPort,
			})
			.then(response => {
				message.author.send(commands.jugadores(response.players));
			})
			.catch(error => {
				message.channel.send(`Fallo al conectar con el servidor.`);
			});
	},
};
