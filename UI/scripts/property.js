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
                    <p><i class="fa fa-audio-description">${ad.description}</i></p>
                    <div class="content">
                        <i class="fa fa-shower">     Status: ${ad.status}</i>      
                        <i class="fa fa-home">       Type: ${ad.type}</i>        
                    </div>
                    <div class="content">
                        <i class="fa fa-thumb-tack">     District: ${ad.city}</i>      
                        <i class="fa fa-map-marker">     Location: ${ad.address}</i>      
                    </div>
                    <div class="content">
                        <p class="price"><i class="fa fa-money">${ad.price}/mo</i></p>
                        <div>
                            <button>Buy Now</button>
                            <button id="display-map">Click to view map</button>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('info').innerHTML = advertDetails;
    })
}

addEventListener('load', propertyDetails);
