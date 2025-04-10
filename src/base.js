import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'xxxxxxx',
  authDomain: 'xxxxxxxxx',
  databaseURL: 'xxxxxxxxxxxxxx',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
