const params = new URLSearchParams(window.location.search);

window.addEventListener("load",()=>{
  if(params.has("plant")) {
    const plant_name=params.get("plant");
    console.log(`loading ${plant_name}`);
    loadPlant(plant_name);
  }

  const sidebar_li  = document.querySelectorAll("nav li");
  sidebar_li.forEach((li)=>{
    li.addEventListener("click",(evt)=>{
      const plant_name = li.innerHTML;
      const new_url = `${window.location.href.split('?')[0]}?plant=${plant_name}`;
      updateURL(new_url);
      loadPlant(plant_name);
    });
  });

  const object = document.getElementById("calendar");
  const svg = object.contentDocument.querySelector("svg:first-of-type");
  console.log(svg);

  //svg.querySelector("#week-4 .fri").style.fill="coral";


});

function loadPlant(plantName) {
  const content = document.getElementById("content");
  content.textContent = plantName;
}

function updateURL(url){
  const nextURL = url;
  const nextTitle = 'plant view';
  const nextState = { additionalInformation: 'Updated the URL with JS' };

  window.history.pushState(nextState, nextTitle, nextURL);
}
