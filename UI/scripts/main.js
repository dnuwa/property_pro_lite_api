/* eslint-disable no-use-before-define */
// login a user
document.getElementById('login').onclick = open;
function open() {
  document.querySelector('.bg-modal').style.display = 'flex';
}

document.querySelector('.close').onclick = close;
function close() {
  document.querySelector('.bg-modal').style.display = 'none';
}

// dispaly signup when on login modal
document.getElementById('signup-link').onclick = toggleToSignup;
function toggleToSignup() {
  document.querySelector('.bg-modal').style.display = 'none';
  document.querySelector('.bg-modal-signup').style.display = 'flex';
}

// signup a user
document.getElementById('signup').onclick = openSignup;
function openSignup() {
  document.querySelector('.bg-modal-signup').style.display = 'flex';
}

document.querySelector('.close-signup').onclick = closeSignup;
function closeSignup() {
  document.querySelector('.bg-modal-signup').style.display = 'none';
}

// dispaly login when on signup modal
document.getElementById('login-link').onclick = toggleToLogin;
function toggleToLogin() {
  document.querySelector('.bg-modal-signup').style.display = 'none';
  document.querySelector('.bg-modal').style.display = 'flex';
}

// posting an advert
document.getElementById('advertise').onclick = openAdvertForm;
function openAdvertForm() {
  document.querySelector('.bg-modal-advert').style.display = 'flex';
}

document.querySelector('.close-advert').onclick = closeAdvertForm;
function closeAdvertForm() {
  document.querySelector('.bg-modal-advert').style.display = 'none';
}

const getAllAdvert = () => {
  fetch('https://property-pro-lite-api-app.herokuapp.com/api/v1/property')
  .then(res => res.json())
  .then((advertsObj) => {
      let adverts = advertsObj.data;
      let output = '';
      adverts.forEach(function(advert){
          output += `
          <div class="card">
              <div class="image">
          <img
              src="${advert.Image}">
          </div>
          <div class="title">
              <h5>${advert.Title}</h5>
          </div>
          <div class="description">
              <p>${advert.Description}
          </p>
              <button>Read More...</button>
          </div>
          </div>
          `;
      });
      document.getElementById('main').innerHTML = output;
  })
};
addEventListener('load', getAllAdvert);
