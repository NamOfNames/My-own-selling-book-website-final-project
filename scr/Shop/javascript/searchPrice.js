import { Search, Products } from "./constants.js";

Search.onkeyup = function Search_Prices() {
  let data = [];
  for (let i = 0; i < Products.childElementCount; i++) {
    data.push(
      Products.childNodes[i].lastChild.childNodes[1].lastChild.nodeValue
    );
    var txtValue =
      Products.childNodes[i].lastChild.childNodes[1].lastChild.nodeValue;
    if (txtValue.toUpperCase().indexOf(Search.value.toUpperCase()) > -1) {
      Products.childNodes[i].style.display = "";
    } else {
      Products.childNodes[i].style.display = "none";
    }
  }
};
