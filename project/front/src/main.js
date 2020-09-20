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
const cartButton = document.querySelector('.cart-title')
const summContainer = document.querySelector('.summ')

let LIMIT = 20
let MAXPAGE = 1
let GENRE = ''

function Cart() {
    let items;

    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', '[]');
        items = [];
    } else {
        items = JSON.parse(sessionStorage.getItem('cart'))
    }

    return {
        addItem: (name, genre, price) => {
            items.push({
                name: name,
                genre: genre,
                price: price
            });

            sessionStorage.setItem('cart', JSON.stringify(items));
        },
        removeItem: (name, genre, price) => {
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
        },
        count: () => {
            return items.length
        },
        calculateTotal: () => {
            return items.reduce((sum, i) => {
                return sum + parseFloat(i.price)
            }, 0).toFixed(2)
        }
    }
}

const CART = Cart();

function isGenre(str) {
    return Object.keys(GenreList).reduce((reducer, key) => {
        return reducer ? true : GenreList[key] === str
    }, false)
}

function firstStart() {
    getItems('', '', 0, LIMIT);
    refreshCartContainer();
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
                <img class="cover" src="./resources/123.png" alt="">
                <div class="sticker"></div>
                <div class="item-tile_bottom">
                    <div class="item-name">${item.title}</div>
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

cartButton.addEventListener('click', () => {
    var display = cartContainer.parentElement.style.display;
    if (display == 'none') {
        cartContainer.parentElement.style.display = 'block'
    } else {
        cartContainer.parentElement.style.display = 'none'
    }
})

function refreshCartContainer() {
    function createCartItem(name, genre, price) {
        return `
        <li class="cart-item">
            <span class="cart-name">${name}</span>
            <span class="genre">${genre}</span>
            <span class="price">${price}</span>
            <button onclick="removefromCart(this)">x</button>
        </li>\n`
    }

    cartContainer.innerHTML = CART.getAll().reduce((cartHTML, item) => {
        return cartHTML += createCartItem(item.name, item.genre, item.price);
    }, '')

    summContainer.innerText = 'Сумма: ' + CART.calculateTotal();

    cartButton.lastElementChild.innerText = CART.count();
}

function addToCart(element) {
    const itemParams = element.parentElement.parentElement.parentElement.innerText.split('\n');
    CART.addItem(itemParams[0], itemParams[1], itemParams[2].split(' ')[0])
    refreshCartContainer();
}

function removefromCart(element) {
    const itemParams = element.parentElement;

    CART.removeItem(
        itemParams.querySelector('.cart-name').innerText,
        itemParams.querySelector('.genre').innerText,
        itemParams.querySelector('.price').innerText
    );
    refreshCartContainer();
}

dragElement(cartContainer.parentElement);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}