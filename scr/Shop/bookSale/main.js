import {
  Search,
  Products,
  UserIcon,
  btn_UserLogin,
  btn_UserLogout,
} from "../constant.js";

Search.onkeyup = function Search_Products() {
  const products = document.getElementById("products");
  for (let i = 0; i < products.childElementCount; i++) {
    var txtValue = products.childNodes[i].lastChild.firstChild.innerHTML;
    if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
      products.childNodes[i].style.display = "";
    } else {
      products.childNodes[i].style.display = "none";
    }
  }
};

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
import { auth } from "../../Admin/firebase.js";

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const dbrt = getDatabase(app);
export const refDb = ref(dbrt);

const getListBook = () => {
  get(child(refDb, "Books/")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const listUser = Object.values(data);
      listUser.forEach((item) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", item.id);

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");
        let image = document.createElement("img");
        image.setAttribute(
          "src",
          `../../../assets/images/BookImages/${item.name}.jpg`
        );
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        let container = document.createElement("div");
        container.classList.add("container");

        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = item.name.toUpperCase();
        container.appendChild(name);

        let price = document.createElement("h6");
        price.innerHTML = "<b>Price:</b> " + item.price + " VND";
        container.appendChild(price);

        let btn = document.createElement("button");
        btn.setAttribute("onclick", "addToCart()");
        btn.innerHTML = "Thêm vào giỏ hàng";
        btn.classList.add("btn_AddtoCart");
        container.appendChild(btn);

        card.appendChild(container);
        document.getElementById("products").appendChild(card);

        let link = document.getElementById(item.id);
        link.addEventListener("click", () => {
          localStorage.setItem("id_book", item.id);
          window.location.replace("../bookInfo/index.html");
        });
      });
    }
  });
};

window.onload = getListBook();
