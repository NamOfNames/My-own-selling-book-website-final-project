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
import { app, analytics, dbrt, refDb, firebaseConfig } from "../firebase.js";
import { UserLogin, UserLogout } from "../main.js";
import {
  Search,
  Products,
  UserIcon,
  Account,
  Selection,
  Amount,
  TableCartInfo,
  User,
  btn_AddtoFavourites,
  btn_UserLogin,
  btn_UserLogout,
  btn_AddtoCart,
  TotalCheckoutPrice,
  btn_ClearLS,
} from "../constant.js";

const getBookInfo = () => {
  const book_id = localStorage.getItem("id_book");
  get(child(refDb, `Books/${book_id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      get(child(refDb, `Favourites/${User}/${data.id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          btn_AddtoFavourites.style.color = "red";
        } else {
          btn_AddtoFavourites.style.color = "black";
        }
      });

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

      btn_AddtoCart.addEventListener("click", () => {
        const login = JSON.parse(localStorage.getItem("login"));
        if (login) {
          const UserUID = localStorage.getItem("User");
          try {
            const CartInfo = {
              id: data.id,
              price: data.price,
              amount: Amount.value,
              name: data.name,
            };
            set(ref(dbrt, `Cart/${UserUID}/${data.id}`), CartInfo);
            alert("Đã thêm vào giỏ hàng");
          } catch (error) {
            alert(error);
          }
        } else {
          window.location.assign("../auth/Login/index.html");
        }
      });
      btn_AddtoFavourites.addEventListener("click", () => {
        get(child(refDb, `Favourites/${User}/${data.id}`)).then((snapshot) => {
          if (snapshot.exists()) {
            remove(ref(dbrt, `Favourites/${User}/${data.id}`));
            btn_AddtoFavourites.style.color = "black";
          } else {
            const FavouritesBookInfo = {
              id: data.id,
            };
            set(ref(dbrt, `Favourites/${User}/${data.id}`), FavouritesBookInfo);
            btn_AddtoFavourites.style.color = "red";
          }
        });
      });
    }
  });
};

window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});
window.onload = getBookInfo();
