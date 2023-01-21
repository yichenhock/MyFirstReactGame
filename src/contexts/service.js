const IP = 'http://127.0.0.1:5000';

var HEADER = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Auth-Token': '',
    'Refresh-Token': '',
});

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: HEADER,
        redirect: 'follow',
        body: JSON.stringify({
            email: user.email,
            password: user.password 
        })
    };
    return fetch("https://artfol.club/api/user/login", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return { err: error };
        });
}

export { 
    login,
};