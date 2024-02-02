const addButton = document.querySelector(".fa-plus");

const minusButton = document.querySelector(".fa-minus");

const addToCartButton = document.querySelector(".cart button");

const icon = document.querySelector(".cart .fa-check");

const viewCartText = document.querySelector(".cart p");

const getElementByClassName = (classname) => {
  document.querySelector(`.${classname}`);
};

// To adjust the quntity of the product

addButton.addEventListener("click", () => {
  const value = document.querySelector(".quantity p");
  value.innerHTML = parseInt(value.innerHTML) + 1;
});

minusButton.addEventListener("click", () => {
  const value = document.querySelector(".quantity p");

  if (parseInt(value.innerHTML) > 1) {
    value.innerHTML = parseInt(value.innerHTML) - 1;
  }
});

// Function for the query the Url to send to the server

const queryUrl = () => {
  const fullUrlString = window.location.hash;
  const extractingUrl = fullUrlString.slice(1).split("/");

  // Extract Product Details

  const productDescription = extractingUrl[3];
  const price = extractingUrl[4];

  return { productDescription, price };
};

// function to add tick in the add to cart button

addToCartButton.addEventListener("click", async () => {
  try {
    const {productDescription,price} = queryUrl();
    icon.style.display = "block";
    viewCartText.style.display = "block";
    const url = "http://localhost:5500/product/cart";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
          productDescription,
          price
      }),
    });
  } catch (err) {
    console.log("Unable to add product to the cart", err);
  }
});

const reviews = document.querySelector(".description .comments");
console.log(reviews);

const reviewForm = document.querySelector(".reviews");
console.log(reviewForm);

// to toggle the description and reviews button

const desButton = document.querySelector(".desButton");

const descriptionText = document.querySelector(".description p");
console.log(descriptionText);

reviews.addEventListener("click", () => {
  descriptionText.classList.add("active");
  reviewForm.classList.add("present");
});

desButton.addEventListener("click", () => {
  descriptionText.classList.toggle("active");
  reviewForm.classList.toggle("present");
});

// To select the rating of the product

const ratingIcons = document.querySelectorAll(".ratingIcons .fa-star");
console.log(ratingIcons);

ratingIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const clickedIndex = [...ratingIcons].indexOf(icon);

    ratingIcons.forEach((innerIcon, innerIndex) => {
      if (innerIndex <= clickedIndex) {
        innerIcon.classList.add("color");
      } else {
        innerIcon.classList.remove("color");
      }
    });
  });
});

// To show the dropdown menu when clicked

document.addEventListener("DOMContentLoaded", function () {
  const accountButton = document.querySelector(".accountButton");
  const accountSubMenu = document.querySelector(".submenu");

  accountButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click event from reaching the document
    accountSubMenu.classList.toggle("show");
  });

  document.addEventListener("click", function () {
    accountSubMenu.classList.remove("show");
  });
});

// To dispaly the Product details on the page:

const queryParams = () => {
  const fullUrlString = window.location.hash;
  const extractingUrl = fullUrlString.slice(1).split("/");
  console.log(extractingUrl);

  // Extract Product Details

  const productDescription = extractingUrl[3];
  const price = extractingUrl[4];

  const productDetail = document.querySelector(".about .productDes");
  const priceUpdated = document.querySelector(".about .price");
  productDetail.innerText = productDescription;
  priceUpdated.innerText = price;

  const image = document.querySelector(".image img");
  const sourceOfImage = localStorage.getItem("image");
  image.setAttribute("src", sourceOfImage);

  //   const image =
  console.log(sourceOfImage);
};

queryParams();

// Send a request to server for storing the product detail
// For add to cart
