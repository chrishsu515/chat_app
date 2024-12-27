const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

admin.initializeApp();

// Cloud Firestore triggers ref: https://firebase.google.com/docs/functions/firestore-events
exports.myFunctionV1 = functions.firestore
  .document('chat/{messageId}')
  .onCreate((snapshot, context) => {
    // Return this function's promise, so this ensures the firebase function
    // will keep running, until the notification is scheduled.
    return admin.messaging().send({
      // Sending a notification message.
      notification: {
        title: snapshot.data()['username'],
        body: snapshot.data()['text'],
      },
      data: {
        // Data payload to be sent to the device.
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      topic: 'chat',
    });
  });

// import { onDocumentCreated } from 'firebase-functions/v2/firestore';
// import { initializeApp } from 'firebase-admin/app';
// import { getMessaging } from 'firebase-admin/messaging';

// initializeApp();

// export const myFunction = onDocumentCreated({
//   document: 'chat/{messageId}'
// }, async (event) => {
//   const snapshot = event.data;
//   if (!snapshot) {
//     return;
//   }

//   const message = {
//     notification: {
//       title: snapshot.data()['username'],
//       body: snapshot.data()['text'],
//     },
//     data: {
//       click_action: 'FLUTTER_NOTIFICATION_CLICK',
//     },
//     topic: 'chat',
//   };
  
//   return getMessaging().send(message);
// });