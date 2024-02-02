const express = require("express");
const app = express();
const clothingRoutes = require("./routes/routes");
const notFound = require("./middlewares/notFound");
require("dotenv").config();
const http = require('http')

const cors = require("cors");

const { connection } = require("./dataBase/database");
const { productDetail } = require("./controller/productController");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { v4: uuidv4 } = require("uuid");
const webSocketService = require('./services/webSocketSerive')

//middlewares





app.use(express.json());
app.use(cors());
app.options('*', cors());
const server = http.createServer(app);
webSocketService.on('connection', (socket) => {
  console.log('WebSocket connected');
  // Handle additional WebSocket connection logic if needed
});


// TO store the sessions of users in the Database

const store = new MongoDBStore(
  {
    uri: process.env.MONGO_URI,
    collection: "mySessions",
  },
  function (error) {
    if (error) {
      console.log("Error during connecting to Database", error);
    } else {
      console.log("Connected to database successfully");
    }
  }
);

// Middleware for generating sessionId and set cookie for future refernece
app.use(
  session({
    genid: function (req) {
      return uuidv4(); // use UUIDs for session IDs
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.use("/product", clothingRoutes);

// app.use(notFound);

const port = 5500;

//to connect server

const startServer = async () => {
  try {
    await connection(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`The server is listening to the port ${port}`);
    });
  } catch (err) {
    console.log("there is an error in connecting server", err);
  }
};

startServer();
