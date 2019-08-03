let form = document.getElementById("signup-form");
const signup = (e) =>{
    e.preventDefault();
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let phoneNumber = document.getElementById('phonenumber').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('https://property-pro-lite-api-app.herokuapp.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            password
        })
    })
    .then((res) => res.json())
    .then((data) => {
       
        if (data.error) {
            swal({
                text: data.error
            })
        } else {
            swal({
                text: data.message
            }).then(() => {
                window.location.replace('index.html');
            })
        }
    })
    form.reset()
}

document.getElementById('signup-button').addEventListener('click', signup);
