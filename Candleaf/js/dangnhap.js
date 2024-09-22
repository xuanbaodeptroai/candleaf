const nut = document.querySelectorAll("#togglePassword");
const accountSumit = document.querySelector(".account-submit");
const inpEmail = document.querySelector("#email");
const inpPassword = document.querySelector("#password");

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
accountSumit.addEventListener("click", (e) => {
  e.preventDefault();
  const email = inpEmail.value;

  const password = inpPassword.value;
  console.log(email, password);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      firebase
        .database()
        .ref("users/" + user.uid)
        .update({
          updated_date: new Date().toString(),
        });
      window.location.href = "../index.html";

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});
