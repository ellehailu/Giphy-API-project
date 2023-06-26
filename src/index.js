import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getGif(phrase) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=UsWbW2GSEj9Jx5uFbETNmfPmIxdb9OIX&q=${phrase}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  request.addEventListener("readystatechange", function() {
    console.log(this.readyState);
  });

  request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        printElements(response, phrase);
      } else {
        printError(this, response, phrase);
      }
    });

  request.open("GET", url, true);
  request.send();
}

function printError(request, data, phrase) {
  document.querySelector('#showResponse').innerHTML = `There was an error accessing the weather data for ${phrase}:  ${request.status} ${request.statusText}: ${data.message}`;
}

function printElements(data) {
  
  document.querySelector('#showResponse').innerHTML = `Here's your gif!.`;
  document.querySelector("#img1").src = data.images.original.url;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const phrase = document.querySelector('#phrase').value;
  document.querySelector('#phrase').value = null;
  getGif(phrase);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});