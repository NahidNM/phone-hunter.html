const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
// add phone container
const displayPhones = (phones, dataLimit) => {
  console.log(phones);
  const divContainer = document.getElementById("phone-container");
  divContainer.innerText = "";

  // how many we see phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //  No phone
  const noPhone = document.getElementById("no-phone");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const divphones = document.createElement("div");
    divphones.classList.add("col");
    divphones.innerHTML = `
          <div class="card h-100 p-5 text-center">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.slug}</p>

              <!-- Button trigger modal -->
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">Show Details</button>
              
            </div>
          </div>
         `;
    divContainer.appendChild(divphones);
  });

  toggleSpinner(false);
};

// search button
document.getElementById("btn-search").addEventListener("click", function () {
  // start load
  // toggleSpinner(true);
  //   const searchField = document.getElementById('search-field');
  //   const searchText = searchField.value;
  //   loadPhones(searchText);
  processSearch(10);
});

// search enter field
document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key === "Enter") {
      processSearch(10);
    }
  });

// loading function
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// common function
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

//  not the best way to load show
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = details =>{
  console.log(details);
const modelTitle = document.getElementById('exampleModalLabel');
modelTitle.innerText = details.brand;

const modalDetails = document.getElementById('modal-details');
modalDetails.innerHTML = `
<p>Name : ${details.name}</p>
<p>Date : ${details.releaseDate ? details.releaseDate : 'no releaseDate'}</p>
<p>Memory : ${details.mainFeatures ? details.mainFeatures.memory : 'no memory'}</p>
<p>Size : ${details.mainFeatures ? details.mainFeatures.displaySize : 'no displaySize'}</p>
<p>ChipSet : ${details.mainFeatures ? details.mainFeatures.chipSet : 'no chipSet'}</p>
<p>Price : 103000</p>
`
}

loadPhones('phone');
