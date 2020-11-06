//("hello");
window.addEventListener('DOMContentLoaded', getNav);

function getNav() {
  fetch("https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/categories?parent=5&orderby=count&order=desc")
    .then(res => res.json())
    .then(handleCategoryNavData)
}

function handleCategoryNavData(categories) {
  categories.forEach(addNavLink);
}

function addNavLink(oneCategory) {
  //  console.log("cat");
  //  console.log(oneCategory);
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = "category.html?cat_id=" + oneCategory.id;
  a.textContent = oneCategory.name;
  console.log(a);
  li.appendChild(a);
  document.querySelector('nav ul').appendChild(li);
}

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
  const template = document.querySelector('template').content;
  const copy = template.cloneNode(true);
  copy.querySelector('.model').textContent = result.title;
  document.querySelector('main').appendChild(copy);
}
