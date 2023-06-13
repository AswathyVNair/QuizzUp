export function handleSignup(e, auth, createUserWithEmailAndPassword) {
  e.preventDefault();

  const signupForm = document.querySelector(".signup");
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  const signupMessage = document.querySelector(".signupMessage");

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created: ", cred.user);
      signupForm.reset();
      signupMessage.textContent =
        "You have successfully registered! Please proceed to the login page to access your account.";
      signupMessage.classList.remove("error");
      signupMessage.classList.add("success");
    })
    .catch((err) => {
      console.log(err.message);
      if (err.message == "Firebase: Error (auth/invalid-email).") {
        signupMessage.textContent =
          "Invalid email. Please enter a valid email address";
      } else if (err.message == "Firebase: Error (auth/missing-password).") {
        signupMessage.textContent =
          "Password is required. Please enter a password.";
      } else if (
        err.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        signupMessage.textContent =
          "Password should be at least 6 characters long";
      } else {
        signupMessage.textContent = "An error occured during registration ";
      }

      signupMessage.classList.remove("success");
      signupMessage.classList.add("error");
    });
}
