const userCart = require("../model/userCart");
const websocketService = require("../services/webSocketSerive");
const WebSocket = require("ws");

// To save the product in the database
const saveProduct = async (req, res) => {
  try {
    const { userId, product, quantity } = req.body;

    let existingCart = await userCart.findById( userId );

    if (!existingCart) {
      existingCart = await userCart.create({
        userId: userId,
        productToSave: [{ product, quantity }],
      });
    }

    existingCart.productToSave.push({ product: product, quantity: quantity });
    await existingCart.save();
    // Populate the referenced fields
    const updatedCartProduct = await userCart
      .findById(existingCart._id)
      .populate("userId") // 'userId' is the reference to 'UserLoginDetail'
      .populate("productToSave.product"); // 'product' is the reference to 'Clothing'

    console.log(updatedCartProduct);

    websocketService.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "cartUpdate",
            data: updatedCartProduct, // Send the product data
          })
        );
      }
    });
    res
      .status(200)
      .json("The product has been saved successfully in the database");
  } catch (err) {
    res.status(500).json({ error: "cannot add product", message: err.message });
  }
};



module.exports = { saveProduct};
