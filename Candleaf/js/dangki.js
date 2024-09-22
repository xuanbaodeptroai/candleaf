const nut = document.querySelectorAll("#togglePassword");
const loi = document.querySelector(".show-error");
const loader = document.querySelector(".loader");
const reg = document.querySelector(".but-reg-in");
const suc = document.querySelector(".show-suc");

nut.forEach((password) => {
  password.addEventListener("click", () => {
    const input = password.previousElementSibling;
    if (password.className.includes("fa-eye-slash")) {
      input.type = "password";
      password.className = "fa-regular fa-eye toggle-password";
    } else {
      input.type = "text";
      password.className = "fa-regular fa-eye-slash toggle-password";
    }
  });
});

const accountSumit = document.querySelector(".account-submit");
const inpEmail = document.querySelector("#email");
const inpPassword = document.querySelector("#password");

const inpCfPassword = document.querySelector("#cf-password");

accountSumit.addEventListener("click", (e) => {
  e.preventDefault();
  const email = inpEmail.value;

  const password = inpPassword.value;

  const cfPassword = inpCfPassword.value;
  if (password === cfPassword) {
    loader.style.display = "inline-block";
    reg.style.display = "none";
    accountSumit.classList.add("loading");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            email: email,
            created_dated: new Date().toString(),
            updated_date: null,
          });
        console.log(user);

        loader.style.display = "none";
        reg.style.display = "block";
        accountSumit.classList.remove("loading");
        suc.style.visibility = "visible";
        suc.style.color = "#00FF00";
        setTimeout(() => {
          suc.style.visibility = "hidden";
        }, 2000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        loi.textContent = error.message;
        loi.style.visibility = "visible";

        setTimeout(() => {
          loi.style.visibility = "hidden";
        }, 2000);
      })
      .finally(() => {
        loader.style.display = "none";
        reg.style.display = "block";
        accountSumit.classList.remove("loading");
      });
  }
});
