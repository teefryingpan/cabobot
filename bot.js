var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /[Cc]abobot/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  
  
  botResponse = generateResponse();
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function generateResponse() {
  console.log('generating response');
  var responseArray = [
    'No waves, no glory',
    'Lifes a wave',
    'If it swells, ride it',
    'If in doubt, paddle out',
    'D-u-u-u-d-e',
    'Drugs? No thanks Im a surfer',
    'Work is for people who dont surf',
    'Dude you should have been here yesterday!',
    'Bro',
    'Out of water, I am nothing.',
    'When you’re itching for the waves, the only lotion is the ocean',
    'If you ever stop surfing, Then you never did',
  ];  
  return responseArray[Math.floor(Math.random()*responseArray.length)];
}

exports.respond = respond;
