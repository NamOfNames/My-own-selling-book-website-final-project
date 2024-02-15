// Import

import {
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { dbrt, refDb, app, analytics, firebaseConfig } from "../firebase.js";
import {
  input_RewriteAge,
  input_RewriteName,
  input_RewriteEmail,
  input_AddUserAge,
  input_AddUserEmail,
  input_AddUserName,
  input_AddUserPassword,
  input_RewriteAmount,
  input_RewriteBookName,
  input_RewriteDescription,
  input_RewritePrice,
  input_RewriteRating,
  input_RewriteAuthor,
  input_RewriteGenre,
  input_RewritePages,
  input_RewriteYear,
  input_AddAmount,
  input_AddAuthor,
  input_AddBookName,
  input_AddDescription,
  input_AddID,
  input_AddPages,
  input_AddPrice,
  input_AddRating,
  input_AddGenre,
  input_AddPubYear,
  table,
  btn_SubmitEditUser,
  btn_SubmitEditBook,
  btn_SubmitAddUser,
  btn_SubmitAddBook,
  btn_AddUser,
  btn_AddBook,
  Search,
  UserOption,
  BookOption,
  AddUser_modal,
  AddBook_modal,
  modal,
  span,
  span_1,
} from "../constant.js";
import { editBook } from "./EditBook.js";

// Open, close modal

span.onclick = function () {
  modal.style.display = "none";
};
span_1.onclick = function () {
  AddBook_modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == AddBook_modal) {
    AddBook_modal.style.display = "none";
  }
};

// Add Book

btn_AddBook.addEventListener("click", () => {
  AddBook_modal.style.display = "block";
});

const getListBook = () => {
  get(child(refDb, "Books/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const listUser = Object.values(data);
        listUser.forEach((item) => {
          const tBody = document.createElement("tbody");
          tBody.id = item.id;

          const bodyContentTable = document.createElement("tr");
          const clientContent = document.createElement("td");
          const clientMain = document.createElement("div");
          const clientImage = document.createElement("img");
          const clientInfo = document.createElement("div");

          clientMain.classList.add("client");
          clientImage.classList.add("client-img");
          clientImage.classList.add("bg-img");
          clientImage.setAttribute(
            "src",
            `../../../assets/images/BookImages/${item.name}.jpg`
          );
          clientInfo.classList.add("client-info");

          const valueID = document.createElement("td");
          valueID.classList.add("UID");
          const valueFullName = document.createElement("h4");
          const valueAmount = document.createElement("td");
          const valueGenre = document.createElement("td");
          const valuePrice = document.createElement("td");
          const containerButton = document.createElement("td");

          const btnDelete = document.createElement("button");
          const btnEdit = document.createElement("button");

          btnEdit.addEventListener(
            "click",
            () => (modal.style.display = "block")
          );
          btnDelete.innerHTML = "Delete";
          btnDelete.addEventListener("click", () => deleteBook(item.id));
          btnEdit.innerHTML = "Edit";
          btnEdit.addEventListener("click", () => {
            localStorage.setItem("UID", item.id);
            input_RewriteAmount.innerHTML = item.amount;
            input_RewriteBookName.innerHTML = item.name;
            input_RewriteDescription.innerHTML = item.description;
            input_RewritePrice.innerHTML = item.price;
            input_RewriteRating.innerHTML = item.rating;
            input_RewriteAuthor.innerHTML = item.author;
            input_RewriteGenre.innerHTML = item.genre;
            input_RewritePages.innerHTML = item.pages;
            input_RewriteYear.innerHTML = item.publish_year;
          });

          valueID.innerHTML = item.id;
          valueFullName.innerHTML = item.name;
          valueAmount.innerHTML = item.amount;
          valuePrice.innerHTML = item.price;
          valueGenre.innerHTML = item.genre;

          clientInfo.innerHTML = `
            <h4>${item.name}</h4>
            <small>${item.author}</small>
          `;
          clientMain.appendChild(clientImage);
          clientMain.appendChild(clientInfo);
          clientContent.appendChild(clientMain);

          containerButton.appendChild(btnEdit);
          containerButton.appendChild(btnDelete);

          bodyContentTable.appendChild(valueID);
          bodyContentTable.appendChild(clientContent);
          bodyContentTable.appendChild(valueGenre);
          bodyContentTable.appendChild(valueAmount);
          bodyContentTable.appendChild(valuePrice);
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

// Edit Book

btn_SubmitEditBook.addEventListener("click", () => {
  editBook();
});

// Search Book

Search.onkeyup = function Search_Book() {
  if (BookOption.value == "Name") {
    for (let i = 3; i < table.childElementCount + 2; i++) {
      var txtValue =
        table.childNodes[i].firstChild.childNodes[1].firstChild.lastChild
          .firstChild.nextSibling.innerHTML;
      if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
        table.childNodes[i].style.display = "";
      } else {
        table.childNodes[i].style.display = "none";
      }
    }
  } else if (BookOption.value == "Author") {
    for (let i = 3; i < table.childElementCount + 2; i++) {
      var txtValue =
        table.childNodes[i].firstChild.childNodes[1].firstChild.lastChild
          .lastChild.previousSibling.innerHTML;
      if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
        table.childNodes[i].style.display = "";
      } else {
        table.childNodes[i].style.display = "none";
      }
    }
  } else if (BookOption.value == "Genre") {
    for (let i = 3; i < table.childElementCount + 2; i++) {
      var txtValue = table.childNodes[i].firstChild.childNodes[2].innerHTML;
      if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
        table.childNodes[i].style.display = "";
      } else {
        table.childNodes[i].style.display = "none";
      }
    }
  } else if (BookOption.value == "Amount") {
    for (let i = 3; i < table.childElementCount + 2; i++) {
      var txtValue = table.childNodes[i].firstChild.childNodes[3].innerHTML;
      if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
        table.childNodes[i].style.display = "";
      } else {
        table.childNodes[i].style.display = "none";
      }
    }
  } else {
    for (let i = 3; i < table.childElementCount + 2; i++) {
      var txtValue = table.childNodes[i].firstChild.childNodes[4].innerHTML;
      if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
        table.childNodes[i].style.display = "";
      } else {
        table.childNodes[i].style.display = "none";
      }
    }
  }
};

// Get Book List

window.onload = () => {
  getListBook();
};
