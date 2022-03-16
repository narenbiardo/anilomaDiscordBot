const reportChannel = "reportChanneIDTemplate";

let Discord = require("discord.js");
var commands = require("./commands.js");
var functions = require("./functions.js");
const util = require("minecraft-server-util");

module.exports = {
	jugadorChekMessageAuthorRoles: async function (
		message,
		roleName1,
		roleName2
	) {
		//Retorna true si el miembro tiene al menos uno de los roles
		console.log(
			"Real: " +
				message.member.roles.cache.some(role => role.name === "rolNameTemplate")
		);
		console.log(
			await functions.chekMemberHasAnyRole(message, roleName1, roleName2)
		);

		if (await functions.chekMemberHasAnyRole(message, roleName1, roleName2)) {
			functions.findPlayerOnline(message);
		} else {
			message.channel.send(
				"Solo los admin o colaboradores pueden utilizar este comando."
			);
		}
	},
	jugadoresChekMessageAuthorRoles: async function (
		message,
		roleName1,
		roleName2
	) {
		//Retorna true si el miembro tiene al menos uno de los roles

		if (await functions.chekMemberHasAnyRole(message, roleName1, roleName2)) {
			functions.getPlayerList();
		} else {
			message.channel.send(
				"Solo los admin o colaboradores pueden utilizar este comando."
			);
		}
	},
};
