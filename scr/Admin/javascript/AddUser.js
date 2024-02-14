import {
  input_AddUserAge,
  input_AddUserEmail,
  input_AddUserName,
  input_AddUserPassword,
  btn_SubmitAddUser,
} from "./constant.js";

import {
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { dbrt } from "./firebase.js";

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
const auth = getAuth(app);

btn_SubmitAddUser.addEventListener("click", () => {
  writeUserData();
});

const writeUserData = () => {
  if (
    input_AddUserAge.value != "" &&
    input_AddUserEmail.value != "" &&
    input_AddUserName.value != "" &&
    input_AddUserPassword.value != ""
  ) {
    const email = input_AddUserEmail.value;
    const password = input_AddUserPassword.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        alert("Đăng ký thành công");
        const user = {
          uid: cred.user.uid,
          name: input_AddUserName.value,
          age: input_AddUserAge.value,
          email: email,
          password: password,
        };
        try {
          set(ref(dbrt, `user/${user.uid}`), user);
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          alert("user đã tồn tại");
        }
      });
  } else {
    alert("Need all input");
  }
};
