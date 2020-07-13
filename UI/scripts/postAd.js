const postAdvert = (e) =>{
    e.preventDefault();
    let title = document.getElementById('title').value;
    let type = document.getElementById('type').value;
    let city = document.getElementById('district').value;
    let address = document.getElementById('location').value;
    let rooms = document.getElementById('rooms').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let imageUrl = document.getElementById('image').value;
    let state = document.getElementById('state').value;
    let status = document.getElementById('status').value;

    fetch('https://property-pro-lite-api-app.herokuapp.com/api/v1/property', {
        method: 'POST',
        headers: {
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
    .then((res) => res.json())
    .then((data) => {
        if (data.message === 'No token provided.' || data.message === 'Failed to authenticate token.' ){
            swal({
                type: 'error',
                text: 'Please Signin To Post An Advert'
            }).then(() => {
                window.location.href = 'index.html'
            });
        };
       
        if (data.error) {
            swal({
                type: 'error',
                text: data.error
            })
        } else {
            swal({
                type: 'success',
                text: 'Property Advert Succefully Published'
            }).then(() => {
                window.location.replace('index.html');
            })
        }
    })
}

document.getElementById('post-ad').addEventListener('click', postAdvert);
