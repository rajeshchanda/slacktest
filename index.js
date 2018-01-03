var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var rtm = new RtmClient('xoxb-294489408102-A9FvoYO33a0DuS239515J9J6');
rtm.start();
let channel;
let bot;
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='qltyinfysolutions') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
  bot = '<@' + rtmStartData.self.id + '>';
});
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel);
});
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
	if (message.channel === channel) {
         if (message.text !== null) {
            var pieces = message.text.split(' ');
             
            if (pieces.length > 1) {
                if (pieces[0] === bot) {
                    var response = '<@' + message.user + '>';
                     
                    switch (pieces[1].toLowerCase()) {
                        case "jump":
                            response += '"Ok I can jump"';
                            break;
                        case "help":
                            response += ', currently I support the following commands: jump';
                            break;
                        default:
                            response += ', sorry I do not understand the command "' + pieces[1] + '". For a list of supported commands, type: ' + bot + ' help';
                            break;
                    }
                     
                    rtm.sendMessage(response, message.channel);
                }
            }
        }
    }
});
