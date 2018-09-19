const express = require('express');
const path = require('path');
const app = express();
const admin = require('firebase-admin');
const port = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

var db = admin.firestore();


// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: "Hello" });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));