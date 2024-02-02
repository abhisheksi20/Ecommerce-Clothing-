const ClothingSchema = require("../model/productModel");


// Function to capitalize the first letter of the parameter
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const productDetail = async (req, res) => {
  try {
    // Extract the colour from the req parameters
    const colour = req.params.colour;
    const formattedColour = capitalizeFirstLetter(colour);

    //Query the database for products with formatted colour
    const products = await ClothingSchema.find({
      colour: formattedColour,
    })
      .limit(16)
      .exec();

    //Send the response in json format
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

// When user select Price low to High

const productSortingOnPrice = async (req, res) => {
  const sortType = req.query.sort;

  let sortCriteria;
  if (sortType === "price-low-high") {
    sortCriteria = { price: -1 };
  } else if (sortType === "lowtohigh") {
    sortCriteria = { price: 1 };
  } else {
    res.status(400).json("Invalid request parameters");
  }
  try {
    const productsPrice = await ClothingSchema.find()
      .sort(sortCriteria)
      .limit(12);

    res.status(200).json(productsPrice);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Internal Server Error", message: err.message });
  }
};

const multipleItemsDisplay = async (req, res) => {
  const { filters, categories, price, brand, size } = req.headers;
  // console.log(categories);
  //  console.log(req);

  let priceRange;

  let maxprice;
  if (price) {
    if (price.length === 1) {
      priceRange = price.split("-");
    } else {
      priceRange = price.split(",");
    }

    maxprice = priceRange
      .map((element) => element.split("-").map(Number))
      .reduce((acc, currentArray) => {
        const maxInCurrentArray = Math.max(...currentArray);
        return Math.max(acc, maxInCurrentArray);
      }, 0);
  }

  let query = {
    $and: [],
    $or: [],
  };

  if (categories.length > 0) {
    query.$or.push({ name: { $regex: /lehenga/i } }),
      query.$or.push({ description: { $regex: /lehenga/i } });
  }

  if (price.length > 0) {
    query.$and.push({ price: { $lt: maxprice } });
  }

  if (brand && brand.length > 0) {
    query.$and.push({ brand: { $in: brand } });
  }

  console.log(categories);
  console.log(maxprice);

  try {
    const multipleItems = await ClothingSchema.find(query).limit(12);

    console.log("Number of items found:", multipleItems.length);

    res.status(200).json(multipleItems);
  } catch (err) {
    res
      .status(500)
      .json({ err: "cannot Fetch the Produts", message: err.message });
  }
};





module.exports = { productDetail, productSortingOnPrice, multipleItemsDisplay };
