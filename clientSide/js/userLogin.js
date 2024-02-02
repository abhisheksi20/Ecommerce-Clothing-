const loginButton = document.querySelector(".login");
console.log(loginButton);

const userEmail = document.querySelector("#typeEmailX");
const userPassword = document.querySelector("#typePasswordX");

const userData = ["", ""];

userEmail.addEventListener("input", (e) => {
  userData[0] = userEmail.value;
});

userPassword.addEventListener("input", () => {
  userData[1] = userPassword.value;
});

loginButton.addEventListener("click", async () => {
  //   e.preventDefault();
  try {
    if (userData[0] && userData[1]) {
      const url = "http://localhost:5500/product/signin";
      const response = await fetch(url, {
        method: "POST", // Assuming you are sending a POST request
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({
          email: userData[0],
          password: userData[1],
        }),
      });
      const data = await response.json();
      console.log(data);

      location.replace("http://127.0.0.1:5500/clientSide/productDetailPage.html")
    } else {
      console.log("Please provide email or password");
    }
  } catch (err) {
    console.log("login Failed",console.log(userData[1]));
  }
});


