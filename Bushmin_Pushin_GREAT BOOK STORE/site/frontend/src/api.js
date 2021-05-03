const GenreList = Object.freeze({
    ACTION: "action",
    STRATEGY: "strategy",
    SPORTS: "sports",
    SIMULATION: "simulation",
    RACE: "race",
    ADVENTURE: "adventure",
    RPG: "rpg",
    OTHER: "other",
});

let LIMIT = 12
let MAXPAGE = 1
let GENRE = ''
const itemsContainer = document.querySelector('.items-container')
const pagesContainer = document.querySelector('.pages')
const searchContainer = document.querySelector('.search')

var response;

function getItems(page, limit) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/items?&page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            response = result;
            itemsContainer.innerHTML = parseItemsToHtml(result)
        })
        .catch(error => console.log('error', error));
}

function getItemsByGenre(page, limit, genre) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/items?&genre=${genre}&page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            response = result;
            itemsContainer.innerHTML = parseItemsToHtml(result)
        })
        .catch(error => console.log('error', error));
}

function getItemsBySearch(page, limit, search) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/items?page=${page}&limit=${limit}&description=${document.querySelector('div.search input[type=text]').value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            response = result;
            itemsContainer.innerHTML = parseItemsToHtml(result)
        })
        .catch(error => console.log('error', error));
}

async function getItemById(id) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`http://localhost:3000/items/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function isGenre(str) {
    return Object.keys(GenreList).reduce((reducer, key) => {
        return reducer ? true : GenreList[key] === str
    }, false)
}

function parseItemsToHtml(itemsJson) {
    if (MAXPAGE != itemsJson.pages) {
        MAXPAGE = itemsJson.pages;
        claculatePages(MAXPAGE);
    }

    return itemsJson.items.reduce((str, item) => {
        return str +=
            `<div class="item-tile">
            <div class="item-tile_top">
                <img id="${item.id}" onclick="openItemPage(this.id)" class="cover" src="./resources/123.png" alt="">
                <div class="sticker"></div>
                <div class="item-tile_bottom">
                    <div class="item-name">${item.title}</div>
                    <div class="genre">${item.genre}</div>
                    <div class="price">
                        <span>${Number.parseFloat(item.price.replace(/[^0-9.-]+/g, ""))} $</span>
                        <span><button onclick="addToCart(this)">купить</button></span>
                    </div>
                </div>
            </div>
        </div>\n`
    }, '')
}

function claculatePages(maxPages) {
    function createPage(number) {
        return `<div class="page">${number}</div>\n`
    }

    pagesContainer.innerHTML = '';

    for (let i = 0; i < maxPages; i++) {
        pagesContainer.innerHTML += createPage(i);
    }
}

if (pagesContainer) {
    pagesContainer.addEventListener('click', (click) => {
        if (click.target.innerText.length < 3)
            getItems(GENRE, '', parseInt(click.target.innerText), LIMIT);
    })

}

getItems('', '', 0, LIMIT);