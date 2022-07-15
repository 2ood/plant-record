const left_button = document.getElementById("left");
const right_button = document.getElementById("right");

const horizontal = document.querySelector("horizontal");
const columns = horizontal.getElementsByTagName("column");
const progressbar = document.querySelector("progressbar");
const progress_spot = progressbar.querySelector("spot");
const posts = document.querySelectorAll("ul.posts > li");

let timer =null;

//add event listeners of horizontal touch scrolls
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

//add event listeners of horizontal scroll buttons
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

//add onclick event listeners to post lists
for(let p of posts) {
  p.addEventListener("click",(evt)=>{
    let target =evt.srcElement;
    while(true) {
      console.log(`checking`, target);
      if(target.tagName=="LI" && target.parentNode.classList.contains("posts")) break;
      else {target = target.parentNode;}
    }
    window.location.href=`post.html?id=${target.id}`;
  });
}



function moveActiveColumn(index, next) {
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
  const viewport_width = window.innerWidth;
  return (x/viewport_width);
}
