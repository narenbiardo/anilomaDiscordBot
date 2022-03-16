//retorno de mensaje embed que será enviado a Discord

let Discord = require("discord.js");
let client = new Discord.Client();

const minecraftServerIp = "aniloma.serveminecraft.net";

module.exports = {
	ayuda: function () {
		let word = "`Lista de comandos`";
		let embed = new Discord.MessageEmbed()
			.setTitle(`${word}`)
			.setDescription(
				"```!estado``` — _Informa el estado del servidor a quien lo solicite._ \n ```!facciones``` — _Envía una lista de comandos de facción a quien lo utilice._ \n ```!ip``` — _Envía la IP del servidor a quien use el comando._ \n ```!mecanicas``` — _Envía a quien lo solicita una lista de mecánicas del servidor._ \n ```!report``` — _Envía un mensaje a todos los mod/ adm. con lo que reporte el usuario._"
			)
			.setColor("BLUE");
		return embed;
	},
	estadoOnline: function (onlinePlayers, maxPlayers, roundTripLatency) {
		let wordArray = [
			"`Estado del servidor: online 🟢`",
			"`Jugadores:`",
			"`Latencia:`",
		];
		let embed = new Discord.MessageEmbed()
			.setTitle(`${wordArray[0]}`)
			.setDescription(
				`${wordArray[1]} ${onlinePlayers}/${maxPlayers} \n \n ${wordArray[2]} ${roundTripLatency}ms`
			)
			.setColor("GREEN");
		return embed;
	},
	estadoOffline: function () {
		let word = "`Estado del servidor: offline 🔴`";
		let embed = new Discord.MessageEmbed().setTitle(`${word}`).setColor("RED");
		return embed;
	},
	facciones: function () {
		let word = "`Facciones`";
		let embed = new Discord.MessageEmbed()
			.setTitle(`${word}`)
			.setDescription(
				"```/f create <NOMBRE>``` Para crear tu facción con el <NOMBRE> introducido: este se mostrará antes que tu nombre en el chat; tiene un máximo de 8 caracteres. \n \n ```/f desc <DESC>``` Para establecer una descripción para tu facción, se mostrará debajo del <NOMBRE> de tu facción cuando se entre a tus terrenos. \n \n ```/f invite <NOMBRE>``` Para invitar a un jugador a tu facción. \n \n ```/f kick <NOMBRE>``` Para echar a un jugador de tu facción."
			)
			.setColor("BLUE");
		return embed;
	},
	ip: function () {
		let word = "`Ip`";
		let embed = new Discord.MessageEmbed()
			.setTitle(`${word}`)
			.setDescription(minecraftServerIp)
			.setColor("BLUE");
		return embed;
	},
	mecanicas: function () {
		let word = "`Mecánicas`";
		let embed = new Discord.MessageEmbed()
			.setTitle(`${word}`)
			.setDescription(
				"`Bolsas de…` — Nuestros tenebrosos amiguitos dejan parte de lo que llevan puesto en un empaque hecho de su propia piel, carne… o hueso. ¡Abre las bolsas para obtener objetos! \n \n `Bolsa de…` — A veces todo el cuerpo es usado para componer la bolsa, ¡así que puede que estén vacías! \n \n `CDV/QOL` — Podés sacar los cultivos y replantarlos con tu _mano derecha_. Hay herramientas que te facilitarán aun más la tarea. \n \n `CDV/QOL` — Podés modificar algunos bloques con una pequeña herramienta. ¡Usá tu creatividad al máximo! \n \n `Crafteos` — Vamos a tener que recuperar un poco de conocimiento perdido… \n \n `Enemigos` — La mayoría de las criaturas se han visto alteradas en apariencia y comportamiento, nuevas formas de vida están surgiendo. ¡Cuidado con las hadas! \n \n `Magia` — [WIP] \n \n `Oxígeno` — El ambiente es muy tóxico: Construir estructuras que nieguen totalmente el efecto de la atmósfera nociva de Eríal será una prioridad. \n \n `Vida` — [NATM] Luego del accidente te encuentras muy debilitado, tu vida máxima es de [X] corazones, tienes posibilidad de mejorarte. ¡Cuidado con tropezar, podrías morir! \n \n `Vida` — Tu vida no se regenerará con el tiempo, debes utilizar objetos para recuperarla (por ejemplo, _Vendaje improvisado_)."
			)
			.setColor("BLUE");
		return embed;
	},
	bailar: function () {
		let embed = new Discord.MessageEmbed()
			.setImage(
				`https://gamepedia.cursecdn.com/minecraft_gamepedia/c/ce/Squid.gif?version=30afd96d72b0deb024fed3a4a6731837`
			)
			.setColor("BLUE");
		return embed;
	},
	jugador: function (player) {
		let embed = new Discord.MessageEmbed()
			.setDescription(`**${player}** se encuentra online`)
			.setColor("GREEN");
		return embed;
	},
	jugadores: function (players) {
		let word = "`Jugadores online 🟢`";
		let embed = new Discord.MessageEmbed()
			.setTitle(`${word}`)
			.setDescription(`${players}`)
			.setColor("GREEN");
		return embed;
	},
	reportError: function () {
		let word = "`Reporte`";
		let embed = new Discord.MessageEmbed()
			.setTitle(`${word}`)
			.setDescription("No puedes enviar un reporte vacío.")
			.setColor("RED");
		return embed;
	},
	reportImage: function (message, image) {
		//Reporte de jugador si agregó una imágen en el mensaje
		let word = "`Reporte`";
		let embed = new Discord.MessageEmbed();
		let currentDate = new Date();
		currentDate.setTime(currentDate.getTime() - 3 * 60 * 60 * 1000); //Modificar la hora de Uruguay cambiando el primer parametro
		let time = currentDate.toLocaleTimeString("en-UY");
		embed
			.setTitle(`${word}`)
			.setDescription(
				`Reporte hecho por: **${
					message.author
				}** \n \n *${message.content.substr(message.content.indexOf(" ") + 1)}*`
			) //Eliminar la primer y segunda palabra sumado a espacio
			.setImage(`${image}`)
			.setFooter(`${time}`)
			.setColor("RED");
		return embed;
	},
	reportSimple: function (message) {
		//Reporte de jugador si no agregó una imágen en el mensaje
		let word = "`Reporte`";
		let embed = new Discord.MessageEmbed();
		let currentDate = new Date();
		currentDate.setTime(currentDate.getTime() - 3 * 60 * 60 * 1000); //Modificar la hora de Uruguay cambiando el primer parametro
		let time = currentDate.toLocaleTimeString("en-UY");
		embed
			.setTitle(`${word}`)
			.setDescription(
				`Reporte hecho por: **${
					message.author
				}** \n \n *${message.content.substr(message.content.indexOf(" ") + 1)}*`
			) //Eliminar la primer y segunda palabra sumado a espacio
			.setFooter(`${time}`)
			.setColor("RED");
		return embed;
	},
};
