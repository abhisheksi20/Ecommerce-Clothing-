// client.js

const socket = new WebSocket("ws://localhost:8500");

window.addEventListener("load", () => {
  updateCartUI();
});

// Event listener for when the connection is established

socket.addEventListener("open", (event) => {
  console.log("WebSocket connection opened");
});

socket.addEventListener("message", (event) => {
  console.log("Received message from server:", event.data);

  const message = JSON.parse(event.data);

  // Check the message type
  if (message.type === "cartUpdate") {
    // Update the cart information on the UI
    localStorage.setItem("userCartInfo", JSON.stringify(message));
    updateCartUI();
  }
});

function updateCartUI() {
  // Parse the JSON string into an object
  const parsedMessage = JSON.parse(localStorage.getItem("userCartInfo"));
  console.log(parsedMessage);

  // Check if the message type is "cartUpdate"
  if (parsedMessage.type === "cartUpdate") {
    const productData = parsedMessage.data;

    console.log(productData);

    // Access the product data properties
    const { userId, productToSave } = productData;

    // Assuming productToSave is an array of products
    productToSave.forEach((product) => {
      const { product: productDetails, quantity } = product;

      // to update the UI with productDetails and quantity
      addProductDetailsToGrid(productDetails);
    });
  }
}

function addProductDetailsToGrid(productDetails) {
  // Iterate over the productDetails array
  const productDiv = document.createElement("div");
  productDiv.setAttribute("class", "layout");
  //   productDiv.className = "product-row";

  // Create HTML content for each product
  productDiv.innerHTML = `
    <div>Product Name: ${productDetails.name}</div>
    <div>Price: ${productDetails.price}</div>
    <div>Quantity: ${quantity}</div>
    <!-- Add more details as needed -->

    <img src="${productDetails.img}" alt="Product Image" style="max-width: 100px; max-height: 100px;"> <!-- Example image display -->
  `;

  // Append the product details to the grid
  layout.appendChild(productDiv);
}

// // Event listener for when a message is received from the server
// socket.addEventListener("message", (event) => {
//   console.log("Received message from server:", event.data);
//   // Update the UI or perform actions based on the received message
// });

// // Assume this is triggered when the user adds an item to the cart
// function addItemToCart(itemId) {
//   // Your logic to add an item to the cart...

//   // Send a message to the server
//   const message = { type: "cartUpdate", itemId };
//   socket.send(JSON.stringify(message));
// }
