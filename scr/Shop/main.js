// js global

// variable

//function
import {
  Search,
  Products,
  UserIcon,
  btn_UserLogin,
  btn_UserLogout,
} from "./constants.js";

// Search.onkeyup = function Search_Prices() {
//   let data = [];
//   for (let i = 0; i < Products.childElementCount; i++) {
//     data.push(
//       Products.childNodes[i].lastChild.childNodes[1].lastChild.nodeValue
//     );
//     var txtValue =
//       Products.childNodes[i].lastChild.childNodes[1].lastChild.nodeValue;
//     if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
//       Products.childNodes[i].style.display = "";
//     } else {
//       Products.childNodes[i].style.display = "none";
//     }
//   }
// };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBdO7FMR3KJrGhcBSwY7o9cCWqPcSR4cVo",
  authDomain: "final-project-uvk-jsi01-hb.firebaseapp.com",
  databaseURL:
    "https://final-project-uvk-jsi01-hb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final-project-uvk-jsi01-hb",
  storageBucket: "final-project-uvk-jsi01-hb.appspot.com",
  messagingSenderId: "723734130833",
  appId: "1:723734130833:web:e0728ad318d69bdc67cf30",
  measurementId: "G-RY2KY2Z9L1",
};
import { auth } from "../Admin/firebase.js";

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const dbrt = getDatabase(app);
export const refDb = ref(dbrt);

// window.onload = getListBook();
// window.onload = Account_login();
