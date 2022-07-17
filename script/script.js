const params = new URLSearchParams(window.location.search);

window.addEventListener("load",async ()=>{
  if(params.has("plant")) {
    const plant_name=params.get("plant").toLowerCase();
    console.log(`loading ${plant_name}`);
    const rawJson = await loadPlantJson(plant_name);
    updatePlantProfileDOM(rawJson);
  }

  const sidebar_li  = document.querySelectorAll("nav li");
  sidebar_li.forEach((li)=>{
    li.addEventListener("click",async (evt)=>{
      const plant_name = li.innerHTML.toLowerCase();
      const new_url = `${window.location.href.split('?')[0]}?plant=${plant_name}`;
      updateURL(new_url);
      const rawJson = await loadPlantJson(plant_name);
      updatePlantProfileDOM(rawJson);
    });
  });

  const object = document.getElementById("calendar");
  const svg = object.contentDocument.querySelector("svg:first-of-type");
  console.log(svg);

  //svg.querySelector("#week-4 .fri").style.fill="coral";


});

async function loadPlantJson(plantName) {
  const api_url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/profile/${plantName}`;

  const res = await fetch(api_url);
  const json = await res.json();
  return json;
}

function updatePlantProfileDOM(json) {
  const title = document.getElementById("title");
  const profile_img = document.getElementById("profile-img");
  const details_pre = document.getElementById("details-pre");
  const achievements_group = document.getElementById("chipgroup-achievements");
  const stats_group = document.getElementById("chipgroup-stats");
  const garden_today_ul = document.querySelector("#gardenings-today ul");
  const garden_this_week_ul = document.querySelector("#gardenings-this-week ul");
  const garden_this_month_ul = document.querySelector("#gardenings-this-month ul");
  const garden_last_month_ul = document.querySelector("#gardenings-last-month ul");
  const logs = document.getElementById("logs-pre");


  title.textContent = json.title;
  profile_img.src = json.img_src;
  details_pre.textContent = json.details;
  let chips = "";
  json.achievements.forEach((achievement)=>{
    switch(achievement) {
      case "germ" : {chips+='<chip class="germination"></chip>';break;}
      case "sprout" : {chips+='<chip class="sprout"></chip>';break;}
      case "flower" : {chips+='<chip class="flower"></chip>';break;}
      case "fruit" : {chips+='<chip class="fruit"></chip>';break;}
    }
  });
  achievements_group.innerHTML = chips;

}

function updateURL(url){
  const nextURL = url;
  const nextTitle = 'plant view';
  const nextState = { additionalInformation: 'Updated the URL with JS' };

  window.history.pushState(nextState, nextTitle, nextURL);
}
