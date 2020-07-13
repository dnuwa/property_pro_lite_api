const searchBytype = () =>{
    let type = document.getElementById('type-input').value;

    fetch(`https://property-pro-lite-api-app.herokuapp.com/api/v1/property/type/${type}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
}

document.getElementById('search-form').addEventListener('click', searchBytype);
