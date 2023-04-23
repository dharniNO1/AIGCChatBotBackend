const admin = require("firebase-admin");
const serviceAccount = require("../aigcchatbot-firebase-adminsdk-m7t0o-2354200cab.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

const settings = {
  ignoreUndefinedProperties: false,
};
firestore.settings(settings);

module.exports = firestore;
