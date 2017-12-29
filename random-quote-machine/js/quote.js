quoteEndpoint = "https://talaikis.com/api/quotes/random/";

// Get the quote element
quoteEl = document.getElementById("quote");

// Get the author element
authorEl = document.getElementById("author");

// Get the quote button element
quoteButtonEl = document.getElementById("quote-button");

// Add the click event to the quote button element
quoteButtonEl.addEventListener("click", getQuote);

// Get the twitter button element
twitterButtonEl = document.getElementById("twitter-button");

// Add the click event to the twitter button element
twitterButtonEl.addEventListener("click", createTweet);


document.addEventListener("DOMContentLoaded", function(event) {
	getQuote(quoteEndpoint);
});

function getQuote(quote){
	getJSON(quoteEndpoint,
		function(err, data) {
			if (err !== null) {
				console.log('Something went wrong: ' + err);
			} else {
				quote = data.quote;
				author = data.author;
				
				quoteEl.innerHTML = '"' + quote + '"';
				authorEl.innerHTML = author;
			}
		}
	);
}

function createTweet() {
	var quote = quoteEl.innerHTML;
	var author = authorEl.innerHTML;
	var url = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quote + '" ' + author);
	var win = window.open(url, '_blank');
  	win.focus();
}

// Get JSON data from url
var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
    	var status = xhr.status;
    	if (status === 200) {
    		callback(null, xhr.response);
    	} else {
    		callback(status, xhr.response);
    	}
    };
    xhr.send();
};