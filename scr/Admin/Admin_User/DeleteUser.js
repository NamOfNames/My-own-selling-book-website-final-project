import {
  get,
  child,
  ref,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { app, dbrt, refDb } from "../firebase.js";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

export function deleteUserinDb(uid) {
  get(child(refDb, `user/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const UnactiveUser = {
          email: snapshot.val().email,
          uid: snapshot.val().uid,
        };
        set(ref(dbrt, `unactive user/${uid}`), UnactiveUser);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  remove(ref(dbrt, `user/${uid}`))
    .then(() => {
      ("Remove succeeded.");
      window.location.reload();
    })
    .catch((error) => {
      "Remove failed: " + error.message;
    });
}
