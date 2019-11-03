import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const gameCount = functions.firestore
  // the `{}` to have the function run in every single game document
  // that is created:
  .document(`games/{gameId}`)
  .onCreate(async (snapshot, context) => {
    const data = <FirebaseFirestore.DocumentData>snapshot.data();
    
    const userRef = db.doc(`users/${data.uid}`);

    const userSnap = await userRef.get();
    const userData = <FirebaseFirestore.DocumentData>userSnap.data();

    return userRef.update({
      gameCount: userData.gameCount + 1
    });
  });