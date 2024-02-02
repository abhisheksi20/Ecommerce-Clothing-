const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const  encryption = require("../middlewares/encryDecrypt")

// The password should have one uppercase, one number, one special character and min 8 digit

const userLogin = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
      validate: {
        validator: function (email) {
          var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(email);
        },
        message: (props) => `${props.value} is not valid`,
      },
    },

    //The order of properties matter in the validation, the required should be
    //put before any validator

    phoneNumber: {
      type: Number,
      unique: true,
      required: [true, "User phone number required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    password: {
      type: String,
      required: [true, "Password is required to register"],
      minLength: [8],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not valid password`,
      },
    },
  },
  { timestamps: true }
);

userLogin.pre('save',encryption);



const User = mongoose.model("UserLoginDetail", userLogin);

module.exports = { User };
