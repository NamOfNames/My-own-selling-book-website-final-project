import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  firebaseConfig,
  app,
  analytics,
  dbrt,
  refDb,
  auth,
} from "../firebase.js";
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
import { UserLogin, UserLogout, GetBookInfo } from "../main.js";

const getCartInfo = () => {
  if (Login) {
    const User = localStorage.getItem("User");
    get(child(refDb, `Cart/${User}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const listBook = Object.values(data);
        listBook.forEach((item) => {
          const tBody = document.createElement("tbody");
          const imageTd = document.createElement("td");
          const image = document.createElement("img");
          const name = document.createElement("td");
          const amountTd = document.createElement("td");
          const amount = document.createElement("input");
          const price = document.createElement("td");
          const btn_RemoveTd = document.createElement("td");
          const btn_Remove = document.createElement("button");

          // id.innerHTML = item.id;
          image.classList.add("td-img");
          image.setAttribute(
            "src",
            `../../../assets/images/BookImages/${item.name}.jpg`
          );
          name.innerHTML = item.name;
          amount.min = 1;
          amount.type = "number";
          amount.value = item.amount;
          price.innerHTML = (item.amount * item.price).toFixed(3);
          amount.addEventListener("input", () => {
            var Total = 0;
            price.innerHTML = (amount.value * item.price).toFixed(3);
            for (let i = 3; i < TableCartInfo.childNodes.length; i++) {
              Total += parseInt(
                TableCartInfo.childNodes[i].childNodes[3].innerHTML
              );
            }
            TotalCheckoutPrice.innerHTML = Total.toFixed(3) + " VND";
          });
          btn_Remove.innerHTML = "X";

          imageTd.appendChild(image);
          tBody.appendChild(imageTd);
          tBody.appendChild(name);
          amountTd.appendChild(amount);
          tBody.appendChild(amountTd);
          tBody.appendChild(price);
          btn_RemoveTd.appendChild(btn_Remove);
          tBody.appendChild(btn_RemoveTd);

          TableCartInfo.appendChild(tBody);

          btn_Remove.addEventListener("click", () => {
            const Confirm = confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?");
            if (Confirm) {
              remove(ref(dbrt, `Cart/${User}/${item.id}`))
                .then(() => {
                  ("Remove succeeded.");
                  window.location.reload();
                })
                .catch((error) => {
                  "Remove failed: " + error.message;
                });
            }
          });
        });
      }
    });
  } else {
    window.location.replace("../auth/Login/index.html");
  }
};

function getPriceInfo() {
  var Total = 0;
  for (let i = 3; i < TableCartInfo.childNodes.length; i++) {
    Total += parseInt(TableCartInfo.childNodes[i].childNodes[3].innerHTML);
  }
  TotalCheckoutPrice.innerHTML = Total.toFixed(3) + " VND";
}

window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});
window.onload = getCartInfo();
window.setTimeout(getPriceInfo, 900);
