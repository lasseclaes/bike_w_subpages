//("hello");

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("searchterm");
//console.log(searchTerm);

if (searchTerm) {
  //example of endpoint: //https: //lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/search?_embed&search=1+or+5
  fetch("https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/search?_embed&search=" + searchTerm)
    .then(res => res.json())
    .then(handleSearchResultData)
}

function handleSearchResultData(searchResults) {
  console.log(searchResults);
  searchResults.forEach(showResult);
}

function showResult(result) {
  console.log(result);
}
