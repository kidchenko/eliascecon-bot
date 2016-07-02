import EliasBot from './eliasBot';
import express from 'express';
import http from 'http';

var app = express();

const elias = new EliasBot({
  token: process.env.ELIASTOKEN,
  name: 'eliascecon'
});

elias.run();

// For avoidong Heroku $PORT error
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Elias lives here...');
}).listen(app.get('port'), function() {
  console.log('Running Elias server...', app.get('port'));
});
