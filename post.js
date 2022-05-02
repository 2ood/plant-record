const params = new URLSearchParams(window.location.search);

if(params.has("id")) {
  console.log(`loading ${params.get("id")}.md`);
  fetch(`${params.get("id")}.md`).then((res)=>{
      console.log(res.text());
  });
}
