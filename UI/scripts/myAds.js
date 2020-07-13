const allUserAdverts = () => {
    fetch('https://property-pro-lite-api-app.herokuapp.com/api/v1/user/adverts',{
        method:'GET',
        headers:{
            'Authorization': localStorage.getItem("access_token"),
            'Content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((advertsObj) => {
        if (advertsObj.message === 'No token provided.' || advertsObj.message === 'Failed to authenticate token.' ){
            swal({
                type: 'error',
                text: 'please Signin to view your adverts'
            }).then(() => {
                window.location.href = 'index.html'
            });
        };
        let adverts = advertsObj.data;
        let output = '';
        adverts.forEach((advert) => {
            output += `
            <div class="card" onclick="saveId(${advert.id})">
                <div class="image">
            <img
                src="${advert.imageurl}">
            </div>
            <div class="title">
                <h5>${advert.title}</h5>
            </div>
            <div class="description">
                <p>${advert.description}
            </p>
                <button>Read More...</button>
            </div>
            </div>
            `;
        });
        document.getElementById('main').innerHTML = output;
    })
  };
  document.getElementById('my-adverts').addEventListener('click', allUserAdverts);
  
  const saveId = (advert_id) => {
    localStorage.setItem("advert_id", advert_id);
    window.location.href = 'admin_view.html'
  }
  