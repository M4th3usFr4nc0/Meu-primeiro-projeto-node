// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwEhSkf7u3PyrvN7UWmr2hxn8NmT91aw0",
  authDomain: "controle-financeiro-4deb4.firebaseapp.com",
  projectId: "controle-financeiro-4deb4",
  appId: "349526434728"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };