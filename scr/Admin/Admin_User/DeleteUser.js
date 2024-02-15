import {
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { app, dbrt } from "../firebase.js";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

export function deleteUserinDb(id) {
  remove(ref(dbrt, `user/${id}`))
    .then(() => {
      ("Remove succeeded.");
      window.location.reload();
    })
    .catch((error) => {
      "Remove failed: " + error.message;
    });
}
