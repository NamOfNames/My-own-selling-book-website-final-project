import { UserLogin, UserLogout } from "../main.js";
import { btn_UserLogout } from "../constant.js";

window.onload = UserLogin();
btn_UserLogout.addEventListener("click", () => {
  UserLogout();
});
