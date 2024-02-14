import {
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { deleteUserinDb } from "./DeleteUser.js";
import { editUser } from "./EditUser.js";
import { dbrt, refDb, app, analytics, firebaseConfig } from "./firebase.js";
import {
  input_RewriteAge,
  input_RewriteName,
  input_RewriteEmail,
  btn_SubmitEditUser,
  btn_AddUser,
  AddUser_modal,
  table,
  modal,
  span,
  span_1,
  Search,
} from "./constant.js";
// import { Search_User } from "./SearchUser.js";

span.onclick = function () {
  modal.style.display = "none";
};

span_1.onclick = function () {
  AddUser_modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == AddUser_modal) {
    AddUser_modal.style.display = "none";
  }
};

btn_AddUser.addEventListener("click", () => {
  AddUser_modal.style.display = "block";
});

const getListUser = () => {
  get(child(refDb, "user/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const listUser = Object.values(data);
        listUser.forEach((item) => {
          const tBody = document.createElement("tbody");
          tBody.id = item.uid;

          const bodyContentTable = document.createElement("tr");
          const clientContent = document.createElement("td");
          const clientMain = document.createElement("div");
          const clientImage = document.createElement("div");
          const clientInfo = document.createElement("div");
          const UserContent = document.createElement("div");

          clientMain.classList.add("client");
          clientImage.classList.add("client-img");
          clientImage.classList.add("bg-img");
          clientImage.style.backgroundImage = "none";
          clientInfo.classList.add("client-info");

          const valueID = document.createElement("td");
          valueID.classList.add("UID");
          const valueFullName = document.createElement("h4");
          const valueEmail = document.createElement("td");
          const valueAge = document.createElement("td");
          const containerButton = document.createElement("td");

          const btnDelete = document.createElement("button");
          const btnEdit = document.createElement("button");

          btnEdit.addEventListener(
            "click",
            () => (modal.style.display = "block")
          );
          btnDelete.innerHTML = "Delete";
          btnDelete.addEventListener("click", () => deleteUserinDb(item.uid));
          btnEdit.innerHTML = "Edit";
          btnEdit.addEventListener("click", () => {
            localStorage.setItem("UID", item.uid);
            input_RewriteAge.innerHTML = item.age;
            input_RewriteName.innerHTML = item.name;
            input_RewriteEmail.innerHTML = item.email;
          });

          valueID.innerHTML = item.uid;
          valueFullName.innerHTML = item.name;
          valueEmail.innerHTML = item.email;
          valueAge.innerHTML = item.age;

          clientInfo.innerHTML = `
            <h4>${item.name}</h4>
            <small>${item.email}</small>
          `;
          clientMain.appendChild(clientImage);
          clientMain.appendChild(clientInfo);
          clientContent.appendChild(clientMain);

          containerButton.appendChild(btnEdit);
          containerButton.appendChild(btnDelete);

          bodyContentTable.appendChild(valueID);
          bodyContentTable.appendChild(clientContent);
          bodyContentTable.appendChild(valueAge);
          bodyContentTable.appendChild(valueEmail);
          bodyContentTable.appendChild(containerButton);
          tBody.appendChild(bodyContentTable);
          table.appendChild(tBody);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

window.onload = () => {
  getListUser();
};

btn_SubmitEditUser.addEventListener("click", () => editUser());

Search.onkeyup = function Search_User() {
  for (let i = 3; i < table.childElementCount + 2; i++) {
    var txtValue = table.childNodes[i].firstChild.childNodes[3].innerHTML;
    if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
      table.childNodes[i].style.display = "";
    } else {
      table.childNodes[i].style.display = "none";
    }
  }
};