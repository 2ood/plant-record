
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
const columns = horizontal.getElementsByTagName("column");
const progressbar = document.querySelector("progressbar");
const progress_spot = progressbar.querySelector("spot");

let timer =null;

horizontal.addEventListener("touchstart",()=>{
  if(timer!=null) clearTimeout(timer);
});

horizontal.addEventListener("touchend",()=>{
    timer = setTimeout(function () {
        const index = activeColumnIndex();
        const next = focusedColumnIndex();
        if(index!=next) moveActiveClass(index,next);
        clearTimeout(timer);
    }, 1500);
});

left_button.addEventListener("click", ()=>{
    horizontal.scrollLeft-=horizontal.offsetWidth;

    const index = activeColumnIndex();
    if(index-1>=0) moveActiveClass(index,index-1);
});

right_button.addEventListener("click", ()=>{
  horizontal.scrollLeft+=horizontal.offsetWidth;

  const index = activeColumnIndex();
  if(index+1<columns.length) moveActiveClass(index,index+1);
});

function moveActiveColumn(index, next) {
  console.log(index,next);
  columns[index].classList.remove("active");
  if(next>=0 && next<columns.length) columns[next].classList.add("active");
}

function moveProgressBar(index,next,total) {
  progress_spot.style.marginLeft =`${(index*100.0)/total}%`; //initialize
  progressbar.classList.remove("vanish");

  if(next>=0 &&next<=total)progress_spot.style.marginLeft =`${(next*100.0)/total}%`;
  setTimeout(()=>{progressbar.classList.add("vanish");},500);
}

function moveActiveClass(from, to){
  moveActiveColumn(from,to);
  moveProgressBar(from,to,columns.length);
}

function activeColumnIndex() {
  let index = 0;
  for(;index<columns.length;index++) {
    if(columns[index].classList.contains("active")) return index;
  }
  return index;
}

function focusedColumnIndex() {
  const x = horizontal.scrollLeft;
  return (x/390);
}
