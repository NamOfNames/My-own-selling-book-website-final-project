import {
  input_RewriteAge,
  input_RewriteName,
  input_RewriteEmail,
  input_AddUserAge,
  input_AddUserEmail,
  input_AddUserName,
  input_AddUserPassword,
  input_RewriteAmount,
  input_RewriteBookName,
  input_RewriteDescription,
  input_RewritePrice,
  input_RewriteRating,
  input_RewriteAuthor,
  input_RewriteGenre,
  input_RewritePages,
  input_RewriteYear,
  input_AddAmount,
  input_AddAuthor,
  input_AddBookName,
  input_AddDescription,
  input_AddID,
  input_AddPages,
  input_AddPrice,
  input_AddRating,
  input_AddGenre,
  input_AddPubYear,
  table,
  btn_SubmitEditUser,
  btn_SubmitEditBook,
  btn_SubmitAddUser,
  btn_SubmitAddBook,
  btn_AddUser,
  btn_AddBook,
  Search,
  AddUser_modal,
  AddBook_modal,
  modal,
  span,
  span_1,
} from "../constant.js";

import {
  get,
  set,
  ref,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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
import { app, auth, dbrt, refDb } from "../firebase.js";

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
          get(child(refDb, "unactive user/")).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const listUnactiveUser = Object.values(data);
              for (let i = 0; i < listUnactiveUser.length; i++) {
                if (listUnactiveUser[i].email == input_AddUserEmail.value) {
                  const ActiveUser = {
                    age: input_AddUserAge.value,
                    email: listUnactiveUser[i].email,
                    name: input_AddUserName.value,
                    password: input_AddUserPassword.value,
                    uid: listUnactiveUser[i].uid,
                  };
                  try {
                    set(
                      ref(dbrt, `user/${listUnactiveUser[i].uid}`),
                      ActiveUser
                    );
                    alert("Success");
                    remove(ref(dbrt, `unactive user/${listUnactiveUser[i].uid}`))
                      .then(() => {})
                      .catch((error) => {
                        "Remove failed: " + error.message;
                      });
                    window.location.reload();
                  } catch (error) {
                    alert(error);
                  }
                }
              }
            }
          });
          // alert("User đã tồn tại");
        }
      });
  } else {
    alert("Something is wrong");
  }
};
