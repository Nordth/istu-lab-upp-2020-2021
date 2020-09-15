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
const cartContainer = document.querySelector('.cart-container ul')

let LIMIT = 20
let MAXPAGE = 1
let GENRE = ''

function Cart() {
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', '[]');
    }

    return {
        addItem: (name, genre, price) => {
            let items = JSON.parse(sessionStorage.getItem('cart'));
            items.push({
                name: name,
                genre: genre,
                price: price
            });
            sessionStorage.setItem('cart', JSON.stringify(items));
        },
        removeItem: (name, genre, price) => {
            let items = JSON.parse(sessionStorage.getItem('cart'));
            for (let i of items.keys()) {
                if (items[i].name === name
                    && items[i].genre === genre
                    && items[i].price === price) {
                    items.splice(i, 1)
                    break;
                }
            }

            sessionStorage.setItem('cart', JSON.stringify(items));
        },
        getAll: () => {
            return JSON.parse(sessionStorage.getItem('cart'));
        }
    }
}

const CART = Cart();

function isGenre(str) {
    return Object.keys(GenreList).reduce((reducer, key) => {
        return reducer ? true : GenreList[key] === str
    }, false)
}

function getItems(genre, description, page, limit) {
    if (genre && genre !== '') GENRE = GenreList[genre.toUpperCase()]

    const requestOptions = {
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
                    <div class="price">
                        <span>${item.price} $</span>
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

pagesContainer.addEventListener('click', (click) => {
    getItems(GENRE, '', parseInt(click.target.innerText), LIMIT);
})

searchContainer.querySelector('button').addEventListener('click', () => {
    const searchWord = searchContainer.querySelector('input').value
    getItems('', searchWord, 0, LIMIT)
})

function refreshCartContainer() {
    function createCartItem(name, genre, price) {
        return `
        <li class="cart-item">
            <span class="name">${name}</span>
            <span class="genre">${genre}</span>
            <span class="price">${price}</span>
            <button onclick="removefromCart(this)">x</button>
        </li>\n`
    }

    cartContainer.innerHTML = CART.getAll().reduce((cartHTML, item) => {
        return cartHTML += createCartItem(item.name, item.genre, item.price);
    }, '')
}

function addToCart(element) {
    const itemParams = element.parentElement.parentElement.parentElement.innerText.split('\n');
    CART.addItem(itemParams[0], itemParams[1], itemParams[2].split(' ')[0])
    refreshCartContainer();
}

function removefromCart(element) {
    const itemParams = element.parentElement;

    CART.removeItem(
        itemParams.querySelector('.name').innerText,
        itemParams.querySelector('.genre').innerText,
        itemParams.querySelector('.price').innerText
    );
    refreshCartContainer();
}


