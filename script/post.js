const params = new URLSearchParams(window.location.search);

if(params.has("id")) {
  console.log(`loading ${params.get("id")}.md`);
  fetch(`/posts/${params.get("id")}.html`).then((res)=>{
      document.querySelector("maintext").innerHTML=res.text();
  });
}
