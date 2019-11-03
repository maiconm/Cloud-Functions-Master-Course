import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp();

export const basicHTTP = functions.https.onRequest((request, response) => {
  const name = request.query.name;

  if (!name) {
    response.status(400).send('you must provide a name');
  }

  response.send(`hello ${name}`);
});

// Multi Route ExpressJS HTTP Function
const app = express();

app.get('/cat', (request, response) => {
  response.send('CAT');
});

app.get('/dog', (request, response) => {
  response.send('DOG');
});

export const api = functions.https.onRequest(app)

