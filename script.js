const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// get quote from api
async function getQuote() {
  const proxyUrl = "http://api.allorigins.win/get?url=";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const data = await response.json();
    const quoteObj = JSON.parse(data.contents);

    // if author is blank, add unknown
    if (quoteObj.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = quoteObj.quoteAuthor;
    }

    // reduce font size for long quotes
    if (quoteObj.quoteText.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = quoteObj.quoteText;
    console.log(quoteObj);
  } catch (error) {
    // getQuote();
    console.log("whoops, no quote", error);
  }
}

// On Load
getQuote();
