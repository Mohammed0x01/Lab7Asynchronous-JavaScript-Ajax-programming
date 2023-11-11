document.getElementById("xhr-btn").addEventListener("click", doXHR);
document.getElementById("fetch-btn").addEventListener("click", doFetch);
document.getElementById("fetch-async-btn").addEventListener("click", doFetchAsyncAwait);

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_Key = 'B3uOz9CcphAPhGkThscYjcILNviRvLxn';

function displayResult(responseObject) {
    for (item of responseObject.data) {
        let imgElement = document.createElement('img');
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        document.getElementById('pic').appendChild(imgElement);
    }
}

// This will fetch the API using XMLHTTPRequest (XHR)
function doXHR() {
    let search = document.getElementById("searchGifs").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // When the request is done, successful, and response is ready
        if (this.readyState == 4 && this.status == 200) {
            displayResult(JSON.parse(xhttp.responseText));
        }
    };
    // Send an asynchronous HTTP GET request to the given end point (url)
    let parms = 'api_key=' + API_Key + '&q=' + search + '&limit=5&rating=g';
    xhttp.open("GET", API_URL + '?' + parms);
    xhttp.send();
}


// This will fetch the API using Fetch API with promises
function doFetch() {
    let search = document.getElementById("searchGifs").value;
    let parms = 'api_key=' + API_Key + '&q=' + search + '&limit=5&rating=g';
    let url = API_URL + '?' + parms;
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            displayResult(JSON.parse(text));
        })
        .catch(function (e) {
            console.log("Error: " + e);
        })

}

// This will fetch the API using Fetch API with async/await
async function doFetchAsyncAwait() {
    let search = document.getElementById("searchGifs").value;
    let parms = 'api_key=' + API_Key + '&q=' + search + '&limit=5&rating=g';
    let url = API_URL + '?' + parms;
    let response = await fetch(url); // this is an async call
    let data = await response.json(); // this is an async call
    displayResult(data);
}
