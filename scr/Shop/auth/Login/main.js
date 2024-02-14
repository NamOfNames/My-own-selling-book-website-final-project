import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
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
import {
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { refDb } from "../../Admin/javascript/firebase.js";
import { btn_ClearLS } from "../../Shop/javascript/constants.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const loginForm = document.querySelector("#formLogin");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["signin-email"].value;
  const password = loginForm["signin-password"].value;
  get(child(refDb, "user/")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const listUser = Object.values(data);
      var UserExsist = false;
      listUser.forEach((item) => {
        if (email == item.email && password == item.password) {
          localStorage.setItem("login", true);
          localStorage.setItem("User", item.uid);
          UserExsist = true;
          window.location.replace("../../Shop/html/index.html");
        }
      });
      if (!UserExsist) {
        alert("Either the email or the password is incorrect");
      }
    }
  });
});

function Account_login() {
  const key = JSON.parse(localStorage.getItem("login"));
  if (key) {
    btn_UserLogin.style = "display: none";
    UserIcon.style = "display: block";
  } else {
    btn_UserLogin.style = "display: block";
    UserIcon.style = "display: none";
  }
}

btn_UserLogout.addEventListener("click", () => {
  localStorage.setItem("login", false);
  auth.signOut().then(() => {
    console.log("user signed out");
  });
  window.location.reload();
});
// btn_ClearLS.addEventListener("click", () => {
//   localStorage.clear();
// });
