Pinkman
=======

Simple IRC bot written in Node for #devdk

## About

Pinkman was originally created for the danish development and design community #devdk which primary operates on IRC.

Since we have many users and needed some flexibility to guard the channel and availability to execute commands, we created Pinkman.

Pinkman is named after the character from the TV serie Breaking Bad, of which we're all large fans!
It therefore come as a natural choice to name the bot after a character in the serie.

## Requirements

Pinkman runs on meth and NodeJS.

## Instructions

```
  git clone git@github.com:tkjaergaard/Pinkman.git

  npm install

  node Pinkman.js
````

Next you need to create a `config.json` file in the same directory as `pinkman.js`:

    {
        "channels": ["#yourChannel"],
        "server": "irc.freenode.net",
        "botName": "Bot name",
        "password": "Interaction password with the bot throug private messaging",
        "identifyPass": "Indentification password with NickServ"
    }

For the best result, we're recommending that you use it with the package [Forever](https://npmjs.org/package/forever).

## Public commands

* `!tableflip` - Flip that table.
* `!puttableback` - Put that table back.
* `!dice` - Roll the dice.
* `!quote` - Throw a Pinkman quote, bitch!

## Admin commands
* `voice.......:` voice <user> <channel> <password>
* `devoice.....:` devoice <user> <channel> <password>
* `op..........:` op <user> <channel> <password>
* `deop........:` deop <user> <channel> <password>
* `say.........:` say <channel|user> [<text>] <password>
* `notice......:` notice <channel> [<text>] <password>
* `kick........:` kick <channel> <user> [<text>] <password>
* `invite......:` invite <user> <channel> <password>
* `ban.........:` ban <channel> <user> <password>
* `deban.......:` deban <channel> <user> [<text>] <password>
* `join........:` join <channel> <password>
* `leave.......:` leave <channel> <password>
* `topic.......:` topic <channel> [<topic>] <password>
* `nick........:` nick <nick> <password>
* `identify....:` identify <password>

## Constribution

We welcome all improvements you got for Pinkman. The philosophy is though that is should be dead simple.

Simply create a issue and drop a pull-request and we take a look at it :)

## License

Pinkman is an open source project, and is licenced under MIT. That means that you can do pretty much whatever you wanna do with it.

## Author

Thomas Kjaergaard
http://twitter.com/t_kjaergaard

## Constributors

* [ThomasBS](https://github.com/ThomasBS) - !tableflip cmd
* [AndreasStokholm](https://github.com/AndreasStokholm) - !puttableback cmd
