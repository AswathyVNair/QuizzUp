import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// Firebase initialization and configuration code here

import { handleSignup } from "./signup";
import { handleLogIn } from "./login.js";
import { handleLogOut } from "./login.js";

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

document.addEventListener("DOMContentLoaded", () => {
  //signing up users
  const signupForm = document.querySelector(".signup");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      handleSignup(e, auth, createUserWithEmailAndPassword);
    });
  }

  //logging in and out

  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      handleLogOut(e, signOut, auth, signInWithEmailAndPassword);
    });
  }

  const loginForm = document.querySelector(".login");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      handleLogIn(e, signOut, auth, signInWithEmailAndPassword);
    });
  }
});

//Taking username

// Get the currently logged-in user
// const user = getAuth.currentUser;
const userNameInputField = document.querySelector(".username-inputfield");
const userNameSubmitBtn = document.querySelector(".username-submit-btn");
let userNameByUser;
let user = auth.currentUser;
const userNameMessg = document.querySelector(".username-messg");

// Showing user the username

if (window.location.pathname == "/user_profile/userprofile.html") {
  userNameSubmitBtn.addEventListener("click", () => {
    userNameByUser = userNameInputField.value;

    user = auth.currentUser;

    if (!user.displayName) {
      updateProfile(user, { displayName: userNameByUser })
        .then(() => {
          userNameMessg.innerText = `Username added to user profile successfully. Your username is ${user.displayName}. Kindly reload the page to get into next page`;

          console.log(user.displayName);
          console.log("Username added to user profile successfully");
          console.log(user);
        })
        .catch((error) => {
          console.log("Error adding username to user profile:", error);
        });
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, you can access the `currentUser` property
      console.log(user);
      if (user.displayName) {
        const userName = user.displayName;
        console.log("Username: ", userName);
        window.location.href = "/roleselection/roleselection.html";
      }
    } else {
      console.log("Enter username");
    }
  });
}

// console.log(user);

// onAuthStateChanged(auht, (user) => {
//   if (user.displayName) {
//     const userName = user.displayName;
//     console.log("Username: ", userName);
//     window.location.href = "/roleselection/roleselection.html";
//   } else if (userNameInputField.value) {
//     updateProfile(user, { displayName: userNameInputField.value })
//       .then(() => {
//         console.log("Username added to user profile successfully");
//         console.log(user);
//       })
//       .catch((error) => {
//         console.log("Error adding username to user profile:", error);
//       });
//   } else {
//     console.log("Enter username");
//   }
// });

//Check if user's profile has a display name

// if (user.displayName) {
//   const userName = user.displayName;
//   console.log("Username: ", userName);
//   window.location.href = "/roleselection/roleselection.html";
// } else if (userNameInputField.value) {
//   updateProfile(user, { displayName: userNameInputField.value })
//     .then(() => {
//       console.log("Username added to user profile successfully");
//     })
//     .catch((error) => {
//       console.log("Error adding username to user profile:", error);
//     });
// } else {
//   console.log("Enter username");
// }
