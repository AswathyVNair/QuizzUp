import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyNxKI-DxY12_LlJZdUaDEVk0C7yf9cms",
  authDomain: "quizzup-50bb1.firebaseapp.com",
  projectId: "quizzup-50bb1",
  storageBucket: "quizzup-50bb1.appspot.com",
  messagingSenderId: "47742608189",
  appId: "1:47742608189:web:91caffeeaddc0483309b54",
};

//init services
initializeApp(firebaseConfig);
const auth = getAuth();

//signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

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
      signupMessage.textContent = "An error occurred during registration.";
      signupMessage.classList.remove("success");
      signupMessage.classList.add("error");
    });
});

console.log("hello");
