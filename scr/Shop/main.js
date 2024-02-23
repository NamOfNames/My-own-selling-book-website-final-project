import { Account } from "./constant.js";

// function

function UserLogin() {
  const Login = JSON.parse(localStorage.getItem("login"));
  if (Login) {
    Account.childNodes[1].style.display = "none";
    Account.childNodes[3].style.display = "none";
    Account.childNodes[5].style.display = "block";
    Account.childNodes[7].style.display = "block";
  } else {
    Account.childNodes[1].style.display = "block";
    Account.childNodes[3].style.display = "block";
    Account.childNodes[5].style.display = "none";
    Account.childNodes[7].style.display = "none";
  }
}

function UserLogout() {
  Account.childNodes[1].style.display = "block";
  Account.childNodes[3].style.display = "block";
  Account.childNodes[5].style.display = "none";
  Account.childNodes[7].style.display = "none";
  localStorage.setItem("login", false);
  window.location.reload();
}

function GetBookInfo(id) {
  localStorage.setItem("id_book", id);
  window.location.assign("../bookInfo/index.html");
}

export { UserLogin, UserLogout, GetBookInfo };
