var config = {
    channels: [""], // Channels to connect to on launch
    server: "irc.freenode.net", // Server to connect to
    botName: "pinkman", // The nick of the bot
    password: "", // Password to interact with the bot
    identifyPass: "" // Identify password for nickserv
  },
  irc = require("irc");

var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

bot.addListener('registered', function (message) {
  bot.say('NickServ', "identify " + config.botName + " " + config.identifyPass)
});

bot.addListener('error', function (message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  console.log(message);
});

bot.addListener("pm", function (nick, message) {
  var segments = message.split(" "),
      password = segments[segments.length - 1];

  if (password !== config.password) {
    bot.say(nick, "Invalid password!");
    return false;
  }

  switch (segments[0]) {
    case "voice":
      bot.send("MODE", segments[2], "+v", segments[1]);
      break;
    case "devoice":
      bot.send("MODE", segments[2], "-v", segments[1]);
      break;
    case "op":
      bot.send("MODE", segments[2], "+o", segments[1]);
      break;
    case "deop":
      bot.send("MODE", segments[2], "-o", segments[1]);
      break;
    case "say":
      var toSay = message.match(/\[(.+)\]/);
      bot.say(segments[1], toSay[1]);
      break;
    case "notice":
      var notice = message.match(/\[(.+)\]/);
      bot.send('NOTICE', segments[1], notice[1]);
      break;
    case "kick":
      var kickMsg = message.match(/\[(.+)\]/),
        say = (kickMsg[1] ? kickMsg[1] : "");

      bot.send("KICK", segments[1], segments[2], say);
      break;
    case "invite":
      bot.send("INVITE", segments[1], segments[2]);
      break;
    case "ban":
      bot.send("MODE", segments[1], "+b", segments[2]);
      break;
    case "deban":
      bot.send("MODE", segments[1], "-b", segments[2]);
      break;
    case "join":
      bot.send("JOIN", segments[1]);
      break;
    case "topic":
      var topicRaw = message.match(/\[(.+)\]/),
        topic = (topicRaw[1] ? topicRaw[1] : "");
      bot.send("TOPIC", segments[1], topic);
      break;
    case "nick":
      bot.send("NICK", segments[1]);
      break;
    case "identify":
      bot.say('NickServ', "identify " + config.botName + " " + config.identifyPass);
      break;
    case "help":
      bot.say(nick, "voice.......: voice <user> <channel> <password>");
      bot.say(nick, "devoice.....: devoice <user> <channel> <password>");
      bot.say(nick, "op..........: op <user> <channel> <password>");
      bot.say(nick, "deop........: deop <user> <channel> <password>");
      bot.say(nick, "say.........: say <channel|user> [<text>] <password>");
      bot.say(nick, "notice......: notice <channel> [<text>] <password>");
      bot.say(nick, "kick........: kick <channel> <user> [<text>] <password>");
      bot.say(nick, "invite......: invite <user> <channel> <password>");
      bot.say(nick, "ban.........: ban <channel> <user> <password>");
      bot.say(nick, "deban.......: deban <channel> <user> [<text>] <password>");
      bot.say(nick, "join........: join <channel> <password>");
      bot.say(nick, "topic.......: topic <channel> [<topic>] <password>");
      bot.say(nick, "nick........: nick <nick> <password>");
      bot.say(nick, "identify....: identify <password>");
      break;
  }
});

bot.addListener('raw', function (message) {
  // console.log(message);
});

// Constructive command to flip them tables!
bot.addListener('message', function (from, to, message) {
  if (message === '!tableflip') {
    bot.say(to, '(╯°□°)╯︵ ┻━┻');
  }
});