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
import { refDb } from "../firebase.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AdminloginForm = document.querySelector("#formLogin");

AdminloginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = AdminloginForm["signin-email"].value;
  const password = AdminloginForm["signin-password"].value;
  get(child(refDb, "Admin/")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const listUser = Object.values(data);
      var AdminExsist = false;
      listUser.forEach((item) => {
        if (email == item.email && password == item.password) {
          AdminExsist = true;
          window.location.replace("../index.html");
        }
      });
      if (!AdminExsist) {
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

// btn_AdminLogout.addEventListener("click", () => {
//   localStorage.setItem("login", false);
//   auth.signOut().then(() => {
//     console.log("user signed out");
//   });
//   window.location.reload();
// });
// btn_ClearLS.addEventListener("click", () => {
//   localStorage.clear();
// });
