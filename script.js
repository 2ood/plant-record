
const firebaseConfig = {
  apiKey: "AIzaSyD6VF0W-wEnSyp5IxtPSEhdzicC-9yKjSU",
  authDomain: "ood-plants.firebaseapp.com",
  projectId: "ood-plants",
  storageBucket: "ood-plants.appspot.com",
  messagingSenderId: "1017909141385",
  appId: "1:1017909141385:web:5a3e7787e45b8ae4bd4b58"
};


//const app = firebase.initializeApp(firebaseConfig);
//const fs = app.firestore();
//const storage = app.storage();

const left_button = document.getElementById("left");
const right_button = document.getElementById("right");

const horizontal = document.querySelector("horizontal");


left_button.addEventListener("click", ()=>{
    horizontal.scrollLeft-=horizontal.offsetWidth;
});

right_button.addEventListener("click", ()=>{
  horizontal.scrollLeft+=horizontal.offsetWidth;
});
