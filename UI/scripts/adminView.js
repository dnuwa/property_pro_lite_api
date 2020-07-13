function openAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'flex';

    let advert_id = localStorage.getItem("advert_id");
    fetch(`https://property-pro-lite-api-app.herokuapp.com/api/v1/property/${advert_id}`)
    .then(res => res.json())
    .then((resObject) => {
        document.getElementById('title').value = resObject.data[0].title;
        document.getElementById('type').value = resObject.data[0].type;
        document.getElementById('city').value = resObject.data[0].city;
        document.getElementById('address').value = resObject.data[0].address;
        document.getElementById('rooms').value = resObject.data[0].rooms;
        document.getElementById('price').value = resObject.data[0].price;
        document.getElementById('state').value = resObject.data[0].state;
        document.getElementById('status').value = resObject.data[0].status;
        document.getElementById('description').value = resObject.data[0].description;
        document.getElementById('imageurl').value = resObject.data[0].imageurl;

    })

    .catch((err) => console.log(err))
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
                            <button class="del" onclick="deleteAd()">Delete Advert</button>
                            <button class="edit" id="edit" onclick="openAdEdit()">Edit this advert</button>
                            <button onclick="markSold()">Mark as Sold</button>
                        </div>
                    </div>
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
