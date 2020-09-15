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

const itemsContainer = document.querySelector('.items-container')
const pagesContainer = document.querySelector('.pages')
const searchContainer = document.querySelector('.search')

let LIMIT = 20
let MAXPAGE = 1
let GENRE = ''

function isGenre(str) {
    return Object.keys(GenreList).reduce((reducer, key) => {
        return reducer ? true : GenreList[key] === str
    }, false)
}

function getItems(genre, description, page, limit) {
    if (genre && genre !== '') GENRE = GenreList[genre.toUpperCase()]

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/items?genre=${isGenre(genre) ? genre : ''}&description=${description}&page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            itemsContainer.innerHTML = parseItemsToHtml(result)
        })
        .catch(error => console.log('error', error));
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
                <img class="cover" src="./resources/GTAV.jpg" alt="">
                <div class="sticker"></div>
                <div class="item-tile_bottom">
                    <div class="name">${item.title}</div>
                    <div class="genre">${item.genre}</div>
                    <div class="price">${item.price} $</div>
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

    for (var i = 0; i < maxPages; i++) {
        pagesContainer.innerHTML += createPage(i);
    }
}

pagesContainer.addEventListener('click', (click) => {
    getItems(GENRE, '', parseInt(click.target.innerText), LIMIT);
})

searchContainer.querySelector('button').addEventListener('click', () => {
    var searchWord = searchContainer.querySelector('input').value
    getItems('', searchWord, 0, LIMIT)
})
