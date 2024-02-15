import {
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { dbrt } from "../firebase.js";
import {
  input_RewriteAge,
  input_RewriteName,
  input_RewriteEmail,
} from "../constant.js";

export function editUser() {
  const id = localStorage.getItem("UID");
  set(ref(dbrt, "user/" + id), {
    age: input_RewriteAge.value,
    email: input_RewriteEmail.value,
    id: id,
    name: input_RewriteName.value,
  })
    .then(() => {
      console.log("Edit succeeded.");
      window.location.reload();
    })
    .catch((error) => {
      console.log("Edit failed: " + error.message);
    });
}
