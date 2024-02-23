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
import { app, analytics, dbrt, refDb, auth } from "../firebase.js";
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

const getListBook = () => {
  get(child(refDb, "Books/")).then((snapshot) => {
    if (snapshot.exists()) {
      Products.innerHTML = "";
      const data = snapshot.val();
      const listBook = Object.values(data);
      listBook.forEach((item) => {
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
        imgContainer.addEventListener("click", () => {
          GetBookInfo(item.id);
        });
        card.appendChild(imgContainer);

        let container = document.createElement("div");
        container.classList.add("container");

        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = item.name.toUpperCase();
        name.addEventListener("click", () => {
          GetBookInfo(item.id);
        });
        container.appendChild(name);

        let price = document.createElement("h6");
        price.innerHTML = "<b>Price:</b> " + item.price + " VND";
        container.appendChild(price);

        let btn = document.createElement("button");
        btn.innerHTML = "Thêm vào giỏ hàng";
        btn.classList.add("btn_AddtoCart");
        btn.addEventListener("click", () => {
          const login = JSON.parse(localStorage.getItem("login"));
          if (login) {
            const UserUID = localStorage.getItem("User");
            try {
              set(ref(dbrt, `Cart/${UserUID}/${item.id}`), item);
            } catch (error) {
              alert(error);
            }
          } else {
            window.location.assign("../auth/Login/index.html");
          }
        });
        container.appendChild(btn);

        card.appendChild(container);
        document.getElementById("products").appendChild(card);
      });
    }
  });
};

const getListBookGenre = () => {
  get(child(refDb, `Genre/${Selection.value}`)).then((snapshot) => {
    if (snapshot.exists()) {
      Products.innerHTML = "";
      const data = snapshot.val();
      const listBook = Object.values(data);
      listBook.forEach((item) => {
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
          GetBookInfo(item.id);
        });
      });
    }
  });
};

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

Selection.addEventListener("change", () => {
  if (Selection.value == "None") {
    getListBook();
  } else {
    getListBookGenre();
  }
});

window.onload = getListBook();
window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});

// const getBook = () => {
//   get(child(refDb, "Books/")).then((snapshot) => {
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       const listUser = Object.values(data);
//       listUser.forEach((item) => {
//         try {
//           set(ref(dbrt, `Genre/Science Fiction/${item.id}`), item);
//         } catch (error) {
//           alert(error);
//         }
//       });
//       alert("Success");
//     }
//   });
// };

// getBook();
