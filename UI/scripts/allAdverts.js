const getAllAdvert = () => {
    fetch('https://property-pro-lite-api-app.herokuapp.com/api/v1/property')
    .then(res => res.json())
    .then((advertsObj) => {
        let adverts = advertsObj.data;
        let output = '';
        adverts.forEach(function(advert){
            output += `
            <div class="card" onclick="viewAd(${advert.id})">
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
  
  const viewAd = (advert_id) => {
    localStorage.setItem("advert_id", advert_id);
    window.location.href = 'property.html'
  }
