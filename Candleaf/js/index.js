const signup = document.querySelector("#signup");
const signin = document.querySelector("#signin");
const logout = document.querySelector("#logout");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);
    if (uid) {
      signup.style.display = "none";
      signin.style.display = "none";
    }
  } else {
    logout.style.display = "none";
  }
});
logout.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      signup.style.display = "block";
      signin.style.display = "block";
      logout.style.display = "none";
    })
    .catch((error) => {});
});
