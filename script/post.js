const params = new URLSearchParams(window.location.search);

if(params.has("id")) {
  console.log(`loading ${params.get("id")}.md`);
  fetch(`posts/${params.get("id")}.html`)
    .then(response => response.text());
    .then((promise) => {
      document.querySelector("maintext").innerHTML=promise.result;
  });
}
