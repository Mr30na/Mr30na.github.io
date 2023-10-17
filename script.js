let body = document.querySelector("body");
let input = document.querySelector("#input");
let button = document.querySelector("#submit");
let display = document.querySelector("#display");
let card = document.createElement("div");
let countries = [];
input.value = "";
display.innerHTML = "loading...";
sendRequest("https://restcountries.com/v3.1/all")
  .then((data) => {
    countries = data;
    display.innerHTML = "";
  })
  .catch((err) => {
    console.log(err);
  });

async function sendRequest(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

function displayinfo() {
  let found = false;
  display.innerHTML = "";
  for (let country of countries) {
    let value = input.value.toLowerCase();
    if (country.name.common.toLowerCase() == value) {
      card.innerHTML = "capital:" + " " + country.capital;
      let src = country.flags.png;
      body.style.backgroundImage = `url(${src})`;
      found = true;
      break;
    }
  }
  if (found == false) {
    body.style.backgroundImage = "url()";
    card.innerHTML = "Not found!!!";
  }
  display.appendChild(card);
}
input.addEventListener("keydown", (event) => {
  let keyname = event.key;
  if (keyname == "Enter") {
    displayinfo();
  }
});
