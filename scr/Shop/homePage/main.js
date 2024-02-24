import {
  Search,
  Products,
  UserIcon,
  Account,
  Selection,
  btn_UserLogin,
  btn_UserLogout,
  btn_AddtoCart,
  btn_ClearLS,
} from "../constant.js";

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
import { UserLogin, UserLogout, GetBookInfo } from "../main.js";
import {
  app,
  analytics,
  dbrt,
  refDb,
  auth,
  firebaseConfig,
} from "../firebase.js";

const getListBook = () => {
  get(child(refDb, "Books/")).then((snapshot) => {
    if (snapshot.exists()) {
      Products.innerHTML = "";
      const data = snapshot.val();
      const listBook = Object.values(data);
      for (let i = 0; i < 4; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", listBook[i].id);

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        let image = document.createElement("img");
        image.setAttribute(
          "src",
          `../../../assets/images/BookImages/${listBook[i].name}.jpg`
        );
        imgContainer.appendChild(image);
        imgContainer.addEventListener("click", () => {
          GetBookInfo(listBook[i].id);
        });
        card.appendChild(imgContainer);

        let container = document.createElement("div");
        container.classList.add("container");

        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = listBook[i].name.toUpperCase();
        name.addEventListener("click", () => {
          GetBookInfo(listBook[i].id);
        });
        container.appendChild(name);

        let price = document.createElement("h6");
        price.innerHTML = "<b>Price:</b> " + listBook[i].price + " VND";
        container.appendChild(price);

        card.appendChild(container);
        document.getElementById("products").appendChild(card);
      }
      // listBook.forEach((item) => {
      //   let card = document.createElement("div");
      //   card.classList.add("card");
      //   card.setAttribute("id", listBook[i].id);

      //   let imgContainer = document.createElement("div");
      //   imgContainer.classList.add("image-container");
      //   let image = document.createElement("img");
      //   image.setAttribute(
      //     "src",
      //     `../../../assets/images/BookImages/${listBook[i].name}.jpg`
      //   );
      //   imgContainer.appendChild(image);
      //   imgContainer.addEventListener("click", () => {
      //     GetBookInfo(listBook[i].id);
      //   });
      //   card.appendChild(imgContainer);

      //   let container = document.createElement("div");
      //   container.classList.add("container");

      //   let name = document.createElement("h5");
      //   name.classList.add("product-name");
      //   name.innerText = listBook[i].name.toUpperCase();
      //   name.addEventListener("click", () => {
      //     GetBookInfo(listBook[i].id);
      //   });
      //   container.appendChild(name);

      //   let price = document.createElement("h6");
      //   price.innerHTML = "<b>Price:</b> " + listBook[i].price + " VND";
      //   container.appendChild(price);

      //   card.appendChild(container);
      //   document.getElementById("products").appendChild(card);
      // });
    }
  });
};

window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});

window.onload = getListBook();
