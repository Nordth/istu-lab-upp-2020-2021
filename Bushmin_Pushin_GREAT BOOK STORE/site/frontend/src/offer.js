var Offer = {
    items: [],
    addItemsList(list) {
        this.items = list;
    },
    calculateTotal() {
        return this.items.reduce((sum, i) => {
            return sum + parseFloat(i.price)
        }, 0).toFixed(2)
    },
    renderItems() {
        var itemsContainer = document.querySelector('.offer ul')
        itemsContainer.innerHTML = '';
        for (var i of this.items) {
            itemsContainer.innerHTML += `
<li>
    <span>${i.name}</span>
    <span>${i.price} $</span>
    <button onclick = "Offer.removeItem(this, '${i.name}', '${i.genre}', '${i.price}')">X</button>
</li>`;
        }

        this.renderPrice();
    },
    renderPrice() {
        document.querySelector(".offer-cost").innerHTML = `${this.calculateTotal()} $`;
    },
    removeItem (render, name, genre, price) {
        for (let i of this.items.keys()) {
            if (this.items[i].name === name
                && this.items[i].genre === genre
                && this.items[i].price === price) {
                this.items.splice(i, 1)
                break;
            }
        }
        render.parentElement.remove();
        this.renderPrice();
    },
    Pay() {
        alert('Hmm');
    }
}
