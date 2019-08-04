const propertyDetails = () =>{
    let advert_id = localStorage.getItem("advert_id");
    fetch(`https://property-pro-lite-api-app.herokuapp.com/api/v1/property/${advert_id}`)
    .then(res => res.json())
    .then((responseObj) => {
        let advert = responseObj.data;
        let advertDetails = '';
        advert.forEach((ad)=>{
            advertDetails += `
            <img src="${ad.imageurl}">
                <div class="box">
                    <div class="date">${ad.createdon}</div>
                    <h1>${ad.title}</h1>
                    <p>${ad.description}</p>
                    <p>Status : ${ad.status}</p>
                    <p>Type : ${ad.type}</p>
                    <p>District : ${ad.city}</p>
                    <p>location : ${ad.address}</p>
                    <p class="price">${ad.price}/mo</p>
                    <div>
                        <button>Buy Now</button>
                        <button id="display-map">Click to view map</button>
                    </div>
                </div>
            `;
        });
        document.getElementById('info').innerHTML = advertDetails;
    })
}

addEventListener('load', propertyDetails);
