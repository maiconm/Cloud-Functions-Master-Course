import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as Twilio from 'twilio';

const credentials = functions.config().twilio;

const client = Twilio(credentials.sid, credentials.token);

const db = admin.firestore();

export const sendText = functions.https.onCall(async (data, context) => {
  const userId = context.auth ? context.auth.uid : null;

  const userRef = db.doc(`user/${userId}`);

  const userSnap = await userRef.get();

  const number = userSnap.data().phoneNumber;

  return client.messages.create({
    body: data.message,
    to: number, // user's number
    from: '+18145814020'
  });
});