fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        username: 'joe',
        password: 'secret'
    })
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log(error));