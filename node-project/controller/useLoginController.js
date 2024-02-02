const { User } = require("../model/userLogin");

const crypto = require("crypto-js");

const nodemailer = require("nodemailer");

// to register the user in the database

const userLogin = async (req, res) => {
  try {
    const abhishek = await User.create({
      name: "saurabh",
      email: "singhsaurabh@gmail.com",
      phoneNumber: 8979187804,
      password: "Abhishek@9",
    });

    res.status(200).json("You are registered");
  } catch (err) {
    res.status(500).json({ err: "cannot add the user", message: err.message });
  }
};

// For User Login
// Here I am using session to store the information through caches

const userSignIn = async (req, res) => {
  const {email,password} = req.body;
  console.log(req.body)
  
  try {
    const user = await User.findOne({ email: email  }).lean();

    if (user) {
      var bytes = crypto.AES.decrypt(user.password, "password key 123");
      var originalText = bytes.toString(crypto.enc.Utf8);
      if (password === originalText) {
        const { name, email } = user;
        req.session.user = { name, email };
        req.session.save(function(err){
          if(err) {
            console.log("These is an error while saving",err);
          }else {
            console.log("Session saved successfully")
          }
        });
        res.status(200).json({ message: "Login successfull!" });
        
      } else {
        res.status(400).json({ message: "Password is not correct!" });
      }
    } else {
      res.status(401).json({ message: "User is not found!" });
    }
  } catch (err) {
    res.status(500).json("Login not successful!");
  }
};

// For user Logout

const userLogOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error in destroying session", err);
    } else {
      console.log("LogOut Successfully!");
    }
  });
};

// For sending link to email for password reset

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "singhabhi8979@gmail.com",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});

async function send() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

const sendEmailForResetpassword = async (req, res) => {
  const { email } = req.headers;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      send();
      res
        .status(200)
        .json({ message: "The link for resetting the password has been sent" });
    } else {
      res
        .status(400)
        .json({ message: "The user with this email does not exist!" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Link is not sent due to some server error" });
  }
};

//for reset the password after recieving link

const resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.headers;
    const user = await User.findOneAndUpdate(
      { email: email, password: newpassword },
      { new: true }
    );
    res.status(200).json({ message: "Password has reset successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Some error occured while reseting the password" });
  }
};



//For Delete the user from the database

const deleteUser = async(req,res) => {
    try {
        if(true) {
            const {email} = req.headers;
            const user = await User.findOneAndDelete({email:email});
        }
        res.status(200).json({message:"The user account has deleted"}) 

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {
  userLogin,
  userSignIn,
  userLogOut,
  sendEmailForResetpassword,
  resetPassword,
  deleteUser
};
