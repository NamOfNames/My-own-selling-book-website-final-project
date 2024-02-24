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

window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});