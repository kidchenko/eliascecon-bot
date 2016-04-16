var SlackBots = require('slackbots')
var express = require('express')
var app = express()
var http = require("http")

const elias = new SlackBots({
  token: process.env.TOKEN,
  name: 'eliascecon'
});

function postMessage(message, channel) {
  elias.postMessageToChannel(channel, message, {
    as_user: '@eliascecon'
  });
}

const startMessages = [
  'Cheguei senhores. COMO ESTAMOS?',
  'Acabei de chegar da minha aula de PNL. Foi FUDIDO!',
  'Olá SENHORES, como estamos? Se vocês estão bem, eu também estou!'
]

const morningMessages = [
  'BOM DIA!',
  'BOM DIA SENHORES!',
  'BOM DIA! HOJE É DIA DE FAZER O CAFÉ PINGAR!'
]

elias.on('start', function() {
  postMessage(startMessages[parseInt(Math.random() * startMessages.length)], 'random')
  console.log('> Elias has been started!')
});

elias.on('message', function(data) {
  const trigger = "bom dia"
  const eliasId = 'U10NFSVN3'

  if (data.type === 'message' && data.user !== eliasId) {
    if (data.text.toLowerCase().indexOf(trigger) !== -1) {
      postMessage(morningMessages[parseInt(Math.random() * morningMessages.length)], 'random')
    }
  }
})  

// For avoidong Heroku $PORT error
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Elias lives here...');
}).listen(app.get('port'), function() {
  console.log('Running Elias server...', app.get('port'));
});
