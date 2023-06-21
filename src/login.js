export function handleLogOut(e, signOut, auth, signInWithEmailAndPassword) {
  e.preventDefault();
  //logout

  signOut(auth)
    .then(() => {
      console.log("The user signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//login
export function handleLogIn(
  e,
  signOut,
  auth,
  signInWithEmailAndPassword,
  user
) {
  e.preventDefault();
  const loginForm = document.querySelector(".login");
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const loginMessage = document.querySelector(".login-message");

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in: ", cred.user);
      loginForm.reset();
      loginMessage.textContent = "You have successfully logged in!";
      loginMessage.classList.remove("error");
      loginMessage.classList.add("success");

      // Redirect the user to another page
      window.location.href = "/user_profile/userprofile.html";
    })
    .catch((err) => {
      console.log(err.message);
      if (err.message == "Firebase: Error (auth/user-not-found).") {
        loginMessage.textContent =
          "User not registered. Please sign up to create an account.";
      } else if (err.message == "Firebase: Error (auth/wrong-password).") {
        loginMessage.textContent = "Invalid password. Please try again.";
      } else if (err.message == "Firebase: Error (auth/missing-password).") {
        loginMessage.textContent = "Please enter your password.";
      } else if (err.message == "Firebase: Error (auth/invalid-email).") {
        loginMessage.textContent =
          "Invalid email. Please enter a valid email address.";
      } else {
        loginMessage.textContent = "An error occured during login";
      }

      loginMessage.classList.remove("success");
      loginMessage.classList.add("error");
    });
}
