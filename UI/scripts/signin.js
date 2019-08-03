const signIn = (e) => {
    e.preventDefault();
    let email = document.getElementById('useremail').value;
    let password = document.getElementById('userpassword').value;

    fetch('https://property-pro-lite-api-app.herokuapp.com/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.error){
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: data.error
                });
            }else{
                localStorage.setItem("access_token", data.data.token);
                swal({
                    type: 'success',
                    text: data.message
                }).then(() => {
                    window.location.href = 'index.html'
                });
            }
            
        })
}

document.getElementById('signin-button').addEventListener('click', signIn)
