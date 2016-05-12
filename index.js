'use strict';

var SlackBots = require('slackbots')
var express = require('express')
var app = express()
var http = require('http')
var _ = require('underscore')

const elias = new SlackBots({
  token: process.env.TOKEN,
  name: 'eliascecon'
});

const startMessages = [
  'Cheguei senhores. COMO ESTAMOS?',
  'Acabei de chegar da minha aula de PNL. Foi FUDIDO!',
  'Olá SENHORES, como estamos? Se vocês estão bem, eu também estou!',
  'Estou de volta! Estava trabalhando no meu gerador de energia infinita. FUDIDO!'
]

const morningMessages = [
  'BOM DIA SENHORES! COMO ESTAMOS?',
  'BOM DIA! HOJE É DIA DE FAZER O CAFÉ PINGAR!',
  'BOM DIA? OTIMO DIA! HOJE EU SINTO QUE O CAFÉ VAI PINGAR!',
  'BOM DIA! JÁ FIZ TRÊS VENDAS HOJE! PAAAH!',
]

const howAreYouMessages = [
  'SE VOCÊ ESTÁ BEM EU TAMBÉM ESTOU!',
]

const howAreWeMessages = [
  'SE VOCÊS ESTÃO BEM EU TAMBÉM ESTOU!',
]

const triggers = {
  'bom dia': morningMessages,
  'estou otimo': howAreYouMessages,
  'estou ótimo': howAreYouMessages,
  'estamos otimos': howAreWeMessages,
  'estamos ótimos': howAreWeMessages
};

var postMessage = exports.postMessage = function(message, channel) {
  elias.postMessageToChannel(channel, message, {
    as_user: '@eliascecon'
  });
}

var isTriggerMessage = exports.isTriggerMessage = function(data) {
  return _.contains(_.keys(triggers), sanitize(data));
}

var getRandomMessage = exports.getRandomMessage = function(messages) {
  return messages[parseInt(Math.random() * messages.length)];
}

var sanitize = exports.sanitize = function(message) {
  return message.replace(new RegExp('[?.!]'), '').toLowerCase();
}

// Events
elias.on('start', function() {
  postMessage(getRandomMessage(startMessages), 'random')
  console.log('> Elias has been started!')
});

elias.on('message', function(data) {
  const eliasId = 'U10NFSVN3'
  if (data.type === 'message' && data.user !== eliasId) {
    if (isTriggerMessage(sanitize(data.text))) {
      postMessage(getRandomMessage(triggers[sanitize(data.text)]), 'random');
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
