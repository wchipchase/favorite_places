let places = [];

const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
  };
  
  const domStringBuilder = (x) => {
    let domString = '';
    x.forEach((place) => {
      domString += '<div class="col-4 product">';
      domString +=   `<div class="place">`;
      domString +=   `  <div class="card-header">${place.city}</div>`;
      domString +=   `  <div class="card-header">${place.state}</div>`;
      domString +=   `  <img src=${place.imageURL} class="card-img-top" alt="...">`;
      domString +=   `  <div class="card-body">`;
      domString +=   `    <p class="card-text">${place.favoriteBar}</p>`;
      domString +=   `    <p class="card-text">${place.favoriteRestaurant}</p>`;
      domString +=   `    <p class="card-text">${place.favoriteHotel}</p>`;
      domString +=   `    <p class="card-text">${place.favoriteTouristAttraction}</p>`;
      domString +=   `  </div>`;
      domString +=   `</div>`;
      domString += '</div>';
    })
  
    printToDom('places-container', domString);
  };

  
function executeThisCodeAfterFileLoads(){
    
    const data = JSON.parse(this.responseText);
    places = data.places;
    domStringBuilder(data.places);
    console.log('Yay');
};

function executeThisCodeIfXHRFails() {
    console.error('Oh Shit')
};

const getPlacesData = () => {
    const myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeThisCodeAfterFileLoads);
    myRequest.addEventListener('error', executeThisCodeIfXHRFails);
    myRequest.open('GET', './db/places.json');
    myRequest.send();
    console.log('Yay 2')

};

const buttonClick = (e) => {
  const buttonId = e.target.id;
  const selectedPlaces = [];
  places.forEach((place) => {
    if (place.rating === buttonId) {
      selectedPlaces.push(place);
    };
  });
  
  if(buttonId === 'all') {
    domStringBuilder(places)
  } else {
    domStringBuilder(selectedPlaces)
  }
};

 
const buttonEvents = () => {
  document.getElementById('1star').addEventListener('click', buttonClick);
  document.getElementById('2star').addEventListener('click', buttonClick);
  document.getElementById('3star').addEventListener('click', buttonClick);
  document.getElementById('all').addEventListener('click', buttonClick);
};
  
  const init = () => {
    buttonEvents();
    getPlacesData();
    domStringBuilder(places);
    
  };
  
  init();