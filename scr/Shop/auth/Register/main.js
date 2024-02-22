import {
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { dbrt } from "../../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
const app = initializeApp(firebaseConfig);
const signupForm = document.querySelector("#formSignup");
const auth = getAuth(app);

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const age = signupForm["signup-age"].value;
  const name = signupForm["signup-name"].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      alert("Đăng ký thành công");
      const user = {
        uid: cred.user.uid,
        name: name,
        age: age,
        email: email,
        password: password,
      };
      try {
        set(ref(dbrt, `user/${user.uid}`), user);
      } catch (error) {
        alert(error);
      }
      localStorage.setItem("login", true);
      localStorage.setItem("User", user.uid);
      window.location.replace("../../homePage/index.html");
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") {
        alert("user đã tồn tại");
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

// btn_UserLogout.addEventListener("click", () => {
//   localStorage.setItem("login", false);
//   auth.signOut().then(() => {
//     console.log("user signed out");
//   });
//   window.location.reload();
// });
