function openAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'flex';
};

document.querySelector('.close-edit').onclick = closeAdEdit;
function closeAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'none';
};

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
                <button class="del" onclick="deleteAd()">Delete Advert</button>
                <button class="edit" id="edit" onclick="openAdEdit()">Edit this advert</button>
                <button onclick="markSold()">Mark as Sold</button>
            </div>
            </div>
            `;
        });
        document.getElementById('info').innerHTML = advertDetails;
    })
}

addEventListener('load', propertyDetails);

const deleteAd = () =>{
    let advert_id = localStorage.getItem("advert_id");
    fetch(`https://property-pro-lite-api-app.herokuapp.com/api/v1/property/${advert_id}`,{
        method: 'DELETE',
        headers:{
            'Authorization': localStorage.getItem("access_token"),
            'Content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((response) => {
        swal({
            type: 'success',
            text: 'Deleted'
        }).then(() => {
            window.location.href = 'my_ads.html'
        });
    });
}

const markSold = () => {
    let advert_id = localStorage.getItem("advert_id");
    fetch(`https://property-pro-lite-api-app.herokuapp.com/api/v1/property/${advert_id}/sold`,{
        method: 'PATCH',
        headers:{
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            newStatus: 'SOLD',
        })
    })
    .then(res => res.json())
    .then((response) => {
        console.log(response);
        if(response.error){
            swal({
                text: response.error
            })
        } else{
            swal({
                type: 'success',
                text: 'property marked as sold'
            }).then(() => {
                window.location.href = 'my_ads.html'
            });
        }
    });

};
