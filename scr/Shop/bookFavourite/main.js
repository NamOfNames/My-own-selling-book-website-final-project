import {
  Search,
  Products,
  UserIcon,
  Account,
  Selection,
  Amount,
  TableCartInfo,
  User,
  Login,
  btn_AddtoFavourites,
  btn_UserLogin,
  btn_UserLogout,
  btn_AddtoCart,
  TotalCheckoutPrice,
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

const getListFavourites = () => {
  if (Login) {
    Products.innerHTML = "";
    get(child(refDb, `Favourites/${User}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // Products.innerHTML = "";
        const data = snapshot.val();
        const listBook = Object.values(data);
        listBook.forEach((item) => {
          get(child(refDb, `Books/${item.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              let card = document.createElement("div");
              card.classList.add("card");
              card.setAttribute("id", data.id);

              let imgContainer = document.createElement("div");
              imgContainer.classList.add("image-container");
              let image = document.createElement("img");
              image.setAttribute(
                "src",
                `../../../assets/images/BookImages/${data.name}.jpg`
              );
              imgContainer.appendChild(image);
              imgContainer.addEventListener("click", () => {
                GetBookInfo(data.id);
              });
              card.appendChild(imgContainer);

              let container = document.createElement("div");
              container.classList.add("container");

              let name = document.createElement("h5");
              name.classList.add("product-name");
              name.innerText = data.name.toUpperCase();
              name.addEventListener("click", () => {
                GetBookInfo(data.id);
              });
              container.appendChild(name);

              let price = document.createElement("h6");
              price.innerHTML = "<b>Price:</b> " + data.price + " VND";
              container.appendChild(price);

              card.appendChild(container);
              document.getElementById("products").appendChild(card);
            }
          });
        });
      }
    });
  } else {
    window.location.assign("../auth/Login/index.html");
  }
};

window.onload = getListFavourites();
window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});
