var response;

async function getItemById(id) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`http://localhost:3000/items/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function itemRender() {
    getItemById(window.location.search.match(/\d+/g)[0]).then(r => {
        response = r[0];
        document.querySelector("body > main > div > div:nth-child(2) > div.two-in-row > div:nth-child(1)").innerText = response.title;
        document.querySelector("body > main > div > div:nth-child(2) > div.two-in-row > div:nth-child(2)").innerText = response.price;
        document.querySelector("body > main > div > div:nth-child(2) > div:nth-child(2) > div").innerHTML += response.text;
        document.querySelector("body > main > div > div:nth-child(1) > div > div > img").src = response.highRes;
    })
}

itemRender()

document.querySelector("body > main > div > div:nth-child(1) > div > button").addEventListener('click', () => {
    addToCartPlain(response.title, 'action', response.price.replace(/[^0-9.-]+/g, ""));
})