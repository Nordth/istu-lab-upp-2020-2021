const cartContainer = document.querySelector('.cart-container ul')
const cartButton = document.querySelector('.cart-title')
const summContainer = document.querySelector('.summ')

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

function addToCartPlain(title, genre, price) {
    CART.addItem(title, genre, price)
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

function firstStart() {
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
