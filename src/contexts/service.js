var HEADER = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Auth-Token': '',
    'Refresh-Token': '',
});

function getState() {
    const requestOptions = {
        method: 'GET',
        headers: HEADER,
        redirect: 'follow',
    };
    return fetch("http://3.10.203.36/api/get/deck", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return { err: error };
        });
}

function updateState(state) {
    const requestOptions = {
        method: 'PATCH',
        headers: HEADER,
        redirect: 'follow',
        body: JSON.stringify({
            state: state
        })
    };
    return fetch("http://3.10.203.36/api/get/update/deck", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return { err: error };
        });
}

export { 
    getState,
    updateState,
};