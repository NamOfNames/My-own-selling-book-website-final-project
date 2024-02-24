// js global
const Search = document.getElementById("Search");
const Products = document.getElementById("products");
const UserIcon = document.getElementById("users");
const Account = document.getElementById("menu-dropdown");
const Selection = document.getElementById("selection");
const Amount = document.getElementById("amount");
const TableCartInfo = document.getElementById("table_CartInfo");
const User = localStorage.getItem("User")

const btn_AddtoFavourites = document.getElementById("btn_AddtoFavourites")
const btn_UserLogin = document.getElementById("User_Login");
const btn_UserLogout = document.getElementById("btn_LogoutUser");
const btn_AddtoCart = document.getElementById("btn_AddtoCart");
const TotalCheckoutPrice = document.getElementById("total_checkout_price");
const btn_ClearLS = document.getElementById("ClearLS");

export {
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
};
