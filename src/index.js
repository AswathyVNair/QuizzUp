import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

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

//init firebase app
initializeApp(firebaseConfig);

//init services
// const db = getFirestore();
const auth = getAuth();

// //collection ref
// const colRef = collection(db, "Data Structure");

// //get collection data
// getDocs(colRef).then((snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, doc.data());
//   });
// });

// //doc ref
// const docRef = doc(db, "Data Structure", "hTQC8ykt5OK5hcysh5zT");
// const subCollRef = collection(docRef, "questions");

// //get subCollection Data
// getDocs(subCollRef).then((snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, doc.data(), doc.data().questionText);
//   });
// });

// //Taking each document from database
// const quizId = "hTQC8ykt5OK5hcysh5zT";

//signing up users
document.addEventListener("DOMContentLoaded", () => {
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

const userNameInputField = document.querySelector(".username-inputfield");
const userNameSubmitBtn = document.querySelector(".username-submit-btn");
let userNameByUser;
let user = auth.currentUser;
const userNameMessg = document.querySelector(".username-messg");
// console.log(user.displayName);

// Showing user the username

if (window.location.pathname == "/user_profile/userprofile.html") {
  if (userNameSubmitBtn) {
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
  }

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

//roleselection

onAuthStateChanged(auth, (user) => {});
const creatorBtn = document.querySelector("#creator-btn");
const attendeeBtn = document.querySelector("#attendee-btn");

if (creatorBtn) {
  creatorBtn.addEventListener("click", () => {
    window.location.href = "/Quiz creator/quizcreator.html";
  });
}

if (attendeeBtn) {
  attendeeBtn.addEventListener("click", () => {
    window.location.href = "/Quiz attendee/quizattendee.html";
  });
}

//quizcreator
const quizTitle = document.querySelector("#quiz-title");
const mark = document.querySelector("#quiz-mark");
const numQuestionsInput = document.getElementById("num-questions");
const questionsContainer = document.getElementById("questions-container");
const questionArray = [];
const saveBtnArray = [];
const optionArray = [];
const createQuizBtn = document.querySelector("#create-quiz-btn");

if (numQuestionsInput) {
  numQuestionsInput.addEventListener("change", () => {
    const numQuestions = parseInt(numQuestionsInput.value);
    // Clear any existing question fields
    questionsContainer.innerHTML = "";
    // Generate question fields
    for (let i = 0; i < numQuestions; i++) {
      const questionField = document.createElement("div");
      const optionField = document.createElement("div");
      questionField.innerHTML = `
      <label for="question${i + 1}">Question ${i + 1}:</label>
      <input type="text" id="question${i + 1}">`;

      optionField.innerHTML = `
      <label for="option-a${i + 1}">Option A :</label>
      <input type="text" id="option-a${i + 1}">
      <label for="option-a${i + 1}">Option B :</label>
      <input type="text" id="option-b${i + 1}">
      <label for="option-a${i + 1}">Option C :</label>
      <input type="text" id="option-c${i + 1}">
      <label for="option-a${i + 1}">Option D :</label>
      <input type="text" id="option-d${i + 1}">
      <label for="correct-option${i + 1}">Correct Option :</label>
      <input type="text" id="correct-option${i + 1}">
     `;

      // <!-- Add other necessary fields for options, correct option, etc. -->
      questionsContainer.appendChild(questionField);
      questionsContainer.appendChild(optionField);
    }

    for (let i = 0; i < numQuestions; i++) {
      questionArray[i] = document.querySelector("#question" + (i + 1));
      saveBtnArray[i] = document.querySelector("#save-btn" + (i + 1));
      questionArray[i].addEventListener("change", () => {
        console.log("question" + (i + 1), questionArray[i].value);
      });
    }

    console.log(questionArray[0]);

    createQuizBtn.addEventListener("click", () => {
      for (let i = 0; i < numQuestions; i++) {
        const optionA = document.querySelector("#option-a" + (i + 1));
        const optionB = document.querySelector("#option-b" + (i + 1));
        const optionC = document.querySelector("#option-c" + (i + 1));
        const optionD = document.querySelector("#option-d" + (i + 1));
        const correctOption = document.querySelector(
          "#correct-option" + (i + 1)
        );
        const optionObj = {};

        optionObj.A = optionA.value;
        optionObj.B = optionB.value;
        optionObj.C = optionC.value;
        optionObj.D = optionD.value;
        optionObj.ans = correctOption.value;

        console.log(optionA.value);
        console.log(optionB.value);
        console.log(optionC.value);
        console.log(optionD.value);
        optionArray[i] = optionObj;
        console.log(optionArray);
      }

      //Question submit handler

      let questionsInput = [];
      for (let i = 0; i < parseInt(numQuestionsInput.value); i++) {
        const questionObject = {
          questionText: questionArray[i].value,
          options: {
            option1: optionArray[i].A,
            option2: optionArray[i].B,
            option3: optionArray[i].C,
            option4: optionArray[i].D,
            ans: optionArray[i].ans,
          },
        };
        console.log("hello");
        console.log(optionArray[0].A);
        console.log(questionObject);
        questionsInput[i] = questionObject;
      }

      onAuthStateChanged(auth, async (user) => {
        console.log(questionArray[1]);
        const quizData = {
          userId: user.uid,
          username: user.displayName,
          quizName: quizTitle.value,
          timer: 10,
          marks: mark.value,
          questions: questionsInput,
        };

        // console.log(quizData);
        // console.log(user);
        const db = getFirestore();
        const quizCollectionRef = collection(db, "quizzes");
        const quizDocRef = doc(quizCollectionRef);
        const quizId = quizDocRef.id;
        console.log(quizId);
        await setDoc(quizDocRef, quizData);
      });
    });
  });
}

// Set the data for the quiz document
// const quizData = {
//   userId: user.uid,
//   username: user.displayName,
//   quizName: quizTitle.value,
//   questions: {
//     questionText: "",
//     options: {
//       option1: "",
//       option2: "",
//       option3: "",
//       option4: "",
//     },
//     timer: 10,
//     marks: mark.value,
//   },
// };

//
