const getListBook = () => {
  get(child(refDb, "Books/")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const listUser = Object.values(data);
      listUser.forEach((item) => {
        let card = document.createElement("div");
        card.classList.add("card");

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
        container.appendChild(btn);

        card.appendChild(container);
        document.getElementById("products").appendChild(card);
      });
    }
  });
};
