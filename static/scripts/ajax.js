const Ajax = Object.create(null);

const json = (response) => response.json();

Ajax.query = function (requestObj) {

    const body = JSON.stringify(requestObj);

    return window.fetch("/", {
        "method": "POST",
        "body": body,
        "headers": {
            "Content-Type": "application/json"
        }
    }).then(json); //returns json when object is fetched
};

export default Object.freeze(Ajax);
