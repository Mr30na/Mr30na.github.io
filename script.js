let body = document.querySelector("body");
let input = document.querySelector("#input");
let button = document.querySelector("#submit");
let display = document.querySelector("#display");
let card = document.createElement("div");
let countries = [];
input.value = "";
display.innerHTML = "loading...";
sendRequest();
button.addEventListener("click", () => {
  displayinfo();
});
function sendRequest() {
  let req = new XMLHttpRequest();
  req.open("GET", "https://restcountries.com/v3.1/all");
  req.send();
  console.log("welcome");
  req.addEventListener("readystatechange", () => {
    if (req.readyState === 4 && req.status === 200) {
      display.innerHTML = "";
      countries = JSON.parse(req.response);

      console.log(countries);
    }
  });
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
