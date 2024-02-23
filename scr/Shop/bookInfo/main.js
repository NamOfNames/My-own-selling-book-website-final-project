import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export const firebaseConfig = {
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
import { app, analytics, dbrt, refDb } from "../firebase.js";
import { UserLogin, UserLogout } from "../main.js";
import { btn_UserLogout } from "../constant.js";

const getBookInfo = () => {
  const book_id = localStorage.getItem("id_book");
  get(child(refDb, `Books/${book_id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const BookBoxImage = document.querySelector(".box_img_book");
      const BookName = document.querySelector(".Book_Name");
      const BookAuthor = document.querySelector(".Book_Author");
      const BookPrice = document.querySelector(".Book_Price");
      const BookDescription = document.querySelector(".Book_Description");

      let Image = document.createElement("img");
      Image.setAttribute(
        "src",
        `../../../assets/images/BookImages/${data.name}.jpg`
      );
      BookName.innerHTML = data.name;
      BookAuthor.innerHTML = "Author: " + data.author;
      BookPrice.innerHTML = data.price + " VNĐ";
      BookDescription.innerHTML = data.description;

      BookBoxImage.appendChild(Image);
    } else {
    }
  });
};

window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});
window.onload = getBookInfo();
