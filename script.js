window.addEventListener('DOMContentLoaded', getData);

function getData() {
  //console.log('DOM fully loaded and parsed');
  fetch("https://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/bike?_embed").then(initial => initial.json())
    .then(handleData);
};

function handleData(data) {
  //console.log(data)
  //we now have the JSON
  data.forEach(displayData);
}

function displayData(data) {
  console.log(data.title.rendered)

  const template = document.querySelector('template').content;
  const clone = template.cloneNode(true);

  clone.querySelector('h2').textContent = data.title.rendered;
  clone.querySelector('.price').textContent = data.price;
  //if (!)
  //  //  clone.querySelector('p').innerHTML = data.excerpt.rendered;
  //
  document.querySelector('main').appendChild(clone);
}
