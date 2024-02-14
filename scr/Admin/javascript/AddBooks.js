import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { WriteUser } from "./WriteUser.js";
import { firebaseConfig, app, analytics, dbrt, refDb } from "./firebase.js";
import {
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
  btn_SubmitAddBook,
} from "./constant.js";

const form = document.querySelector(".form_info");
const inputSearch = document.querySelector(".search_user");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   writeBookData(e.target);
// });

btn_SubmitAddBook.addEventListener("click", () => {
  writeBookData();
});

const writeBookData = () => {
  if (
    input_AddAmount.value != "" &&
    input_AddAuthor.value != "" &&
    input_AddBookName.value != "" &&
    input_AddDescription.value != "" &&
    input_AddGenre.value != "" &&
    input_AddID.value != "" &&
    input_AddPages.value != "" &&
    input_AddPrice.value != "" &&
    input_AddPubYear.value != "" &&
    input_AddRating.value != ""
  ) {
    const Books = {
      id: input_AddID.value,
      name: input_AddBookName.value,
      author: input_AddAuthor.value,
      description: input_AddDescription.value,
      amount: input_AddAmount.value,
      genre: input_AddGenre.value,
      pages: input_AddPages.value,
      price: input_AddPrice.value,
      publish_year: input_AddPubYear.value,
      rating: input_AddRating.value,
    };
    try {
      set(ref(dbrt, `Books/${Books.id}`), Books);
      // const userForm = new WriteUser();
      // userForm.WriteUser(user, dbrt, ref, set);
      alert("Success");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  } else {
    alert("Need full input");
  }
};

// inputSearch.addEventListener("change", (e) => {
//   const id = e.target.value;
//   try {
//     get(child(refDb, `user/${id}`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           snapshot.val());
//         } else {
//           alert("Not found");
//         }
//       })
//       .catch((error) => {
//         error);
//       });
//   } catch (error) {}
// });
