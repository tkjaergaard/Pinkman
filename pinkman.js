var fs = require('fs'),
    irc = require('irc'),
    config;

/**
 * Load config file
 * from the file system.
 */
try {
  var configData = fs.readFileSync(__dirname + '/config.json', {encoding: 'utf8'});
  config = JSON.parse(configData);
}
catch (err)
{
  console.error('Error: Can not read config file "' + __dirname + '/config.json"\n\n' + err);
  process.exit(1);
}

/**
 * Create bot instance
 * @type irc
 */
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

bot.addListener('registered', function (message) {
  bot.say('NickServ', 'identify ' + config.botName + ' ' + config.identifyPass)
});

bot.addListener('error', function (message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  console.log(message);
});

bot.addListener('pm', function (nick, message) {
  var segments = message.split(' '),
      password = segments[segments.length - 1];

  if (password !== config.password) {
    bot.say(nick, 'Invalid password!');
    return false;
  }

  switch (segments[0]) {
    case 'voice':
      bot.send('MODE', segments[2], '+v', segments[1]);
      break;
    case 'devoice':
      bot.send('MODE', segments[2], '-v', segments[1]);
      break;
    case 'op':
      bot.send('MODE', segments[2], '+o', segments[1]);
      break;
    case 'deop':
      bot.send('MODE', segments[2], '-o', segments[1]);
      break;
    case 'say':
      var toSay = message.match(/\[(.+)\]/);
      bot.say(segments[1], toSay[1]);
      break;
    case 'notice':
      var notice = message.match(/\[(.+)\]/);
      bot.send('NOTICE', segments[1], notice[1]);
      break;
    case 'kick':
      var kickMsg = message.match(/\[(.+)\]/),
          say = (kickMsg[1] ? kickMsg[1] : '');
      bot.send('KICK', segments[1], segments[2], say);
      break;
    case 'invite':
      bot.send('INVITE', segments[1], segments[2]);
      break;
    case 'ban':
      bot.send('MODE', segments[1], '+b', segments[2]);
      break;
    case 'deban':
      bot.send('MODE', segments[1], '-b', segments[2]);
      break;
    case 'join':
      bot.send('JOIN', segments[1]);
      break;
    case 'leave':
      bot.send('PART', segments[1]);
      break;
    case 'topic':
      var topicRaw = message.match(/\[(.+)\]/),
        topic = (topicRaw[1] ? topicRaw[1] : '');
      bot.send('TOPIC', segments[1], topic);
      break;
    case 'nick':
      bot.send('NICK', segments[1]);
      break;
    case 'identify':
      bot.say('NickServ', 'identify ' + config.botName + ' ' + config.identifyPass);
      break;
    case 'help':
      bot.say(nick, 'voice.......: voice <user> <channel> <password>');
      bot.say(nick, 'devoice.....: devoice <user> <channel> <password>');
      bot.say(nick, 'op..........: op <user> <channel> <password>');
      bot.say(nick, 'deop........: deop <user> <channel> <password>');
      bot.say(nick, 'say.........: say <channel|user> [<text>] <password>');
      bot.say(nick, 'notice......: notice <channel> [<text>] <password>');
      bot.say(nick, 'kick........: kick <channel> <user> [<text>] <password>');
      bot.say(nick, 'invite......: invite <user> <channel> <password>');
      bot.say(nick, 'ban.........: ban <channel> <user> <password>');
      bot.say(nick, 'deban.......: deban <channel> <user> [<text>] <password>');
      bot.say(nick, 'join........: join <channel> <password>');
      bot.say(nick, 'leave.......: leave <channel> <password>');
      bot.say(nick, 'topic.......: topic <channel> [<topic>] <password>');
      bot.say(nick, 'nick........: nick <nick> <password>');
      bot.say(nick, 'identify....: identify <password>');
      break;
  }
});

// Not used at the moment
bot.addListener('raw', function (message) {});

// Public commands
bot.addListener('message', function (from, to, message) {

  if (message === '!tableflip') {
    bot.say(to, '(╯°□°)╯︵ ┻━┻');
  }
  else if(message === '!puttableback')
  {
    bot.say(to, '┬─┬ ノ( ゜-゜ノ)');
  }
  else if(message === '!dice')
  {
    var number = Math.floor(Math.random() * 6) + 1;

    bot.send('NOTICE', to,  'is rolling dice..');
    bot.send('NOTICE', to, 'looking at the dice and '+from+' rolled a '+number);
  }
  else if( message === '!quote' )
  {
    var says = [
      'Like I came to you, begging to cook meth. \'Oh, hey, nerdiest old dude I know, you wanna come cook crystal?\' Please. I\'d ask my diaper-wearing granny, but her wheelchair wouldn\'t fit in the RV.',
      'You know what? Why I\'m here in the first place? Is to sell you meth. You\'re nothing to me but customers! I made you my bitch. You okay with that?',
      'Are we in the meth business, or the money business?',
      'What if this is like math, or algebra? And you add a plus douchebag to a minus douchebag, and you get, like, zero douchebags?',
      'Hey, you girls want to meet my fat stack?',
      'I got two dudes that turned into raspberry slushie then flushed down my toilet. I can\'t even take a proper dump in there. I mean, the whole damn house has got to be haunted by now.',
      'What good is being an outlaw when you have responsibilities?',
      'I\'M A BLOWFISH! BLOWFISH! YEEEAAAH! BLOWFISHIN\' THIS UP!',
      'Yeah, bitch! Magnets!',
      'Yo 148, 3-to-the-3-to-the-6-to-the-9. Representin\' the ABQ. What up, biatch? Leave it at the tone!'
    ];

    var msg = says[ Math.floor( Math.random() * says.length) + 0];

    bot.send('NOTICE', to,  msg);
  }

});