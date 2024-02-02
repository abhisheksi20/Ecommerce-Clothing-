const productDescription = document.querySelectorAll(".productdescription");

const prices = document.querySelectorAll(".price");
const brand = document.querySelectorAll(".brand");
const rating = document.querySelectorAll(".rating");
const avg_rating = document.querySelectorAll(".avg_rating");
const images = document.querySelectorAll("img");
console.log(images);

const styles = "width: 300px; height: 450px;";

images.forEach((image) => {
  image.setAttribute("style", styles);
});

const updateProducts = (product, index) => {
  if (
    productDescription[index] ||
    prices[index] ||
    brand[index] ||
    rating[index] ||
    avg_rating[index] ||
    images[index]
  ) {
    productDescription[index].innerText = product.name;
    prices[index].innerText = product.price;
    brand[index].innerText = product.brand;
    rating[index].innerText = product.avg_rating;
    avg_rating[index].innerText = product.ratingCount;
    images[index].setAttribute("src", product.img);
  }
};

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("http://localhost:5500/product/page/black");

//     const products = await response.json();

//     products.forEach((product, index) => {
//       if (
//         productDescription[index] &&
//         price[index] &&
//         brand[index] &&
//         rating[index] &&
//         avg_rating[index]
//       ) {
//         productDescription[index].innerText = product.name;
//         price[index].innerText = product.price;
//         brand[index].innerText = product.brand;
//         rating[index].innerText = product.avg_rating;
//         avg_rating[index].innerText = product.ratingCount;
//       }
//     });

//     console.log(products);
//   } catch (error) {
//     console.log("there is an error", error);
//   }
// });

// for the sorting the document based on price

const selectForSorting = document.querySelector("#sort-items");

console.log(selectForSorting);

document.addEventListener("DOMContentLoaded", () => {
  checkState();
});

// For updating the URL
const updateQueryString = (key, value) => {
  let url = new URL(window.location.href);

  url.pathname = `${url.pathname}/page`;

  let params = new URLSearchParams(url);

  params.set(key, value);

  //update the url with the modified parameters

  url.search = params.toString();

  window.history.pushState(value, "", url.toString());
};

// to check state

const checkState = () => {
  window.addEventListener("popstate", (event) => {
    location = document.location;
    (state = JSON.stringify(event.state)),
      console.log(
        `location: ${document.location}, state: ${JSON.stringify(event.state)}`
      );

    if (!state) {
      location.reload();
    }
  });
};

selectForSorting.addEventListener("change", async (e) => {
  try {
    if (e.target.value === "price-low-high") {
      console.log("yes selected");

      const response = await fetch(
        "http://localhost:5500/product/page?sort=price-low-high"
      );

      const sortedProducts = await response.json();

      sortedProducts.forEach((product, index) => {
        updateProducts(product, index);
      });
    }

    updateQueryString("sort", e.target.value);
    document.title = `Products sorted by ${e.target.value}`;
  } catch (err) {
    console.log("there is an error", err);
  }
});

const man = document.querySelectorAll("input");

const filters = [];
const categories = [];
const Price = [];
const Brand = [];
const size = [];

const storeCheckboxValues = (element, array) => {
  if (element.defaultChecked) {
    element.defaultChecked = false;
    array.pop(element.value);
  } else {
    element.defaultChecked = true;
    array.push(element.value);
  }
};

man.forEach((element) => {
  element.addEventListener("change", () => {
    if (element.parentElement.className === "Filters") {
      storeCheckboxValues(element, filters);
    }

    if (element.parentElement.className === "Categories") {
      storeCheckboxValues(element, categories);
    }

    if (element.parentElement.className === "brand") {
      storeCheckboxValues(element, Brand);
    }
    if (element.parentElement.className === "prices") {
      storeCheckboxValues(element, Price);
    }

    if (element.parentElement.className === "Size") {
      storeCheckboxValues(element, size);
    }

    checkBoxItemsDisplay();
    console.log(Brand);
  });
});

const checkBoxItemsDisplay = async () => {
  try {
    url = "http://localhost:5500/product/multiple";
    const response = await fetch(url, {
      headers: { filters, categories, Price, Brand, size },
    });
    const data = await response.json();

    data.forEach((product, index) => {
      updateProducts(product, index);
    });
  } catch (err) {
    console.log("Server is not responding", err.message);
  }
};

/**LOGIN PAGE */

// To redirect to another page when click on the product

const productClicked = document.querySelectorAll(".productsonpage");
console.log(productClicked);

const redirectToProductPage = (index) => {
  const categorySlug = rating[index].innerText;
  const brandSlug = brand[index].innerText;
  const productSlug = productDescription[index].innerText;
  const productId = prices[index].innerText;

  // Create URL slugs
  const categoryUrl = categorySlug.replace(/\s+/g, "-").toLowerCase();
  const brandUrl = brandSlug.replace(/\s+/g, "-").toLowerCase();
  const productUrl = productSlug.replace(/\s+/g, "-").toLowerCase();
  const image = images[index].getAttribute('src');

  localStorage.setItem('image',image )

  // Construct the URL with backticks

  



  

  window.location.href = `http://127.0.0.1:5500/clientSide/singleProductShowCase.html#/${categoryUrl}/${brandUrl}/${productUrl}/${productId}/buy`;
};

productClicked.forEach((element, index) => {
  element.addEventListener("click", () => {
    redirectToProductPage(index);
  });
});

// https://www.myntra.com/shirts/the+bear+house/the-bear-house-men-maroon--grey-slim-fit-solid-casual-shirt/12853516/buy
