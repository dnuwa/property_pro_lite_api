const postNewdata =  (e) =>{
    e.preventDefault();
    
    let advert_id = localStorage.getItem("advert_id");

    let title = document.getElementById('title').value;
    let type = document.getElementById('type').value;
    let city = document.getElementById('city').value;
    let address = document.getElementById('address').value;
    let rooms = document.getElementById('rooms').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let imageUrl = document.getElementById('imageurl').value;
    let state = document.getElementById('state').value;
    let status = document.getElementById('status').value;

    fetch(`https://property-pro-lite-api-app.herokuapp.com/api/v1/property/${advert_id}`,{
        method: 'PATCH',
        headers:{
            'Authorization': localStorage.getItem("access_token"),
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            status,
            title,
            description,
            type,
            state,
            city,
            address,
            price,
            imageUrl,
            rooms,
        })
        
    })
    .then(res => res.json())
    .then((resp) => {
        if(resp.error){
            swal({
                text: resp.error
            })
        } else{
            swal({
                type: 'success',
                text: 'Advert has been Successfully Updated'
            }).then(() => {
                window.location.href = 'admin_view.html'
            });
        }
    });
}
document.getElementById('update-advert').addEventListener('click', postNewdata);
