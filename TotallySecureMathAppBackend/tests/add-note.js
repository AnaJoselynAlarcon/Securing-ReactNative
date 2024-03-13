// This JWT (JSON Web Token) was generated after login.
const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTAzMDc3OTksImV4cCI6MTcxMDM5NDE5OSwic3ViIjoiMSJ9.d_dpp8mUdPiJl_W3oNoSP7VtL2x2t3XiI_-smmQcKM6dcfq5qxr9zRW8ZUeBVu3VRPm6_3TLn5ZVYgkUOwsz68iNPQqjW0Up_XbtyhB85g4AWOK-JAncHuW8wnAl9f7D-_AYgqDc5HV7IdVcvsg_jrAlWFKQZCbk5oshzhVpuFEBjm8goI0PDdGDNgpvR2pV2nYjKHr6i1wqzULvMxMR1rTb2-Tegc3ijQZW6UtIlF-aIEyLFh5FiAgOyiBvlc5ajgl6U028lqwQeRVEVt64RHeoAjJmO0ndI1_2kQBCHrejPYG1-KxLW8zqSYlUpYiqFZ9fgDD1LjssVj66hvQvNg';

fetch("http://localhost:3333/notes", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify({
        title: 'This is a test',
        text: '5 * 2'
    })
})
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log(error));