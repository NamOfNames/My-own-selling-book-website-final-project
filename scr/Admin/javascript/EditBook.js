import {
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { dbrt } from "./firebase.js";
import {
  input_RewriteBookName,
  input_RewriteAmount,
  input_RewriteDescription,
  input_RewritePrice,
  input_RewriteRating,
  input_RewriteAuthor,
  input_RewriteGenre,
  input_RewritePages,
  input_RewriteYear,
} from "./constant.js";

export function editBook() {
  const id = localStorage.getItem("UID");
  set(ref(dbrt, "Books/" + id), {
    amount: input_RewriteAmount.value,
    author: input_RewriteAuthor.value,
    description: input_RewriteDescription.value,
    genre: input_RewriteGenre.value,
    id: id,
    name: input_RewriteBookName.value,
    pages: input_RewritePages.value,
    price: input_RewritePrice.value,
    publish_year: input_RewriteYear.value,
    rating: input_RewriteRating.value,
  })
    .then(() => {
      console.log("Edit succeeded.");
      window.location.reload();
    })
    .catch((error) => {
      console.log("Edit failed: " + error.message);
    });
}
