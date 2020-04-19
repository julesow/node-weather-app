
const baseUrl = `http://localhost:3000/weather?address=`;

const weatherForm = document.querySelector("form");
const searchEl = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";


const getData = address => {
  const url = `${baseUrl}${address}`;
  messageOne.textContent = "loading......";
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log("location", data.location);
        console.log("forecast", data.forecast);
      }
    });
  });
};

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const address = searchEl.value;
  console.log(address);

  getData(address);
  searchEl.value = "";
});
