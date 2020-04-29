window.addEventListener('DOMContentLoaded', getData);

//const datalink = "https://annadagbjort.dk/cms-theme/bikes/wp-json/wp/v2/bike?_embed"; - thanks ;-)
const datalink2 = "https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/bikes?_embed";

function getData() {
  getNav();
  //console.log('DOM fully loaded and parsed');
  const urlParams = new URLSearchParams(window.location.search);
  console.log("URLSearchParams " + window.location);
  const the_bike_id = urlParams.get("bike_id"); //getting the id from the URL
  const search_term = urlParams.get("searchterm");
  //alert(search_term);

  //"our routing in the script"
  if (the_bike_id) {
    //single bike view
    fetch("https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/bikes/" + the_bike_id + "?_embed")
      .then(res => res.json())
      .then(showBike) //skipping the forEach loop
  }

  ////lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/search?_embed&search=1+or+5
  else if (search_term) {
    //search results
    fetch("https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/bikes?search=" + search_term + "&_embed")
      .then(res => res.json())
      .then(handleData)
  } else {
    //all bikes view
    fetch(datalink2)
      .then(res => res.json())
      .then(handleData)
  }
}

function getNav() {
  fetch("https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/categories?parent=5&orderby=count&order=desc")
    .then(res => res.json())
    .then(handleCategoryNavData)
}

function handleCategoryNavData(categories) {
  categories.forEach(addNavLink);
}

function addNavLink(oneCategory) {
  console.log("cat");
  //console.log(oneCategory);
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.textContent = oneCategory.name;
  a.href = "category.html?cat_id=" + oneCategory.id;
  console.log(a);
  li.appendChild(a);
  document.querySelector('nav ul').appendChild(li);
}

function handleData(posts) {
  //console.log(posts);
  if (posts) {
    posts.forEach(showBike); //looping through all bikes
  }
}

function showBike(bike) {
  console.log(bike);
  //console.log(bike.content.rendered);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  //console.log(bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

  //lacj: copy.querySelector(".brand").textContent = bikes.brand;

  copy.querySelector(".brand").textContent = bike._embedded["wp:term"][0][1].name;
  //  console.log('hey')
  //  console.log(bikes._embedded["wp:term"]);

  //lacj: copy.querySelector(".model").textContent = bikes.model;
  copy.querySelector(".model").textContent = bike.title.rendered;
  copy.querySelector(".price").textContent = bike.price;
  copy.querySelector(".toPrice").textContent = bike.price_to;

  //    copy.querySelector(".colour").textContent = bikes.colours;

  copy.querySelector(".inStock").textContent = bike.in_stock;

  copy.querySelector(".img-bike").src = bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
  copy.querySelector(".img-bike").alt = bike.brand;

  if (bike.price_to == false) {
    copy.querySelector(".twoPrices").classList.add("hide");
  }

  const colorArray = bike.colours.split(",");

  colorArray.forEach(color => {
    const col = document.createElement("div");
    col.classList.add("colourDiv");
    col.style.background = color;
    copy.querySelector(".colour").appendChild(col)
  })

  if (bike.colours == false) {
    copy.querySelector(".colour").textContent = ("N/A");
  }

  const a = copy.querySelector('a');
  if (a) {
    a.href += bike.id;
  }
  /*takes the existing string value from the ahref attr.
                           and adds the bike.id from JSON to it*/

  const divBikeDescription = copy.querySelector('#bike-description');
  if (divBikeDescription) {
    divBikeDescription.innerHTML = bike.content.rendered;
  }

  //  a.addEventListener('click', function (e) {
  //    e.preventDefault();
  //  });

  document.querySelector("main").appendChild(copy);
}

//const searchbtn = document.querySelector('#search-btn');
//searchbtn.addEventListener('click', doSearch);

//function doSearch(e) {
//  //e.preventDefault();
//  //alert('hello');
//  fetch()
//    .then(res => res.json())
//    .then(handleData)
//}
//https: //lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/search?_embed&search=1+or+5
