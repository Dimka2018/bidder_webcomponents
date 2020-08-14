class Bid extends HTMLElement {

    PACK_SIZE = 3;
    controller = new BidController();
    lots = [];

    connectedCallback() {
        this.controller.getNumberProducts()
            .then(numberProducts => {
                this.numberProducts = numberProducts;
            });
        this.innerHTML = this.getTemplate();
        this.querySelector('.logout_butt').addEventListener('click', e => this.emmitEvent('logout'));
        this.loadLots();
    }

    isSold(product) {
        let now = new Date();
        let end = new Date(product.end.year, product.end.month - 1,
            product.end.day, product.end.hour, product.end.min, product.end.sec, 0);
        return now >= end;
    };

    getLotsTemplate() {
        return this.lots.map(lot => {
            let start = `${lot.start.day}\\${lot.start.month}\\${lot.start.year} ${lot.start.hour}:${lot.start.min}:${lot.start.sec}`;
            let end = `${lot.end.day}\\${lot.end.month}\\${lot.end.year} ${lot.end.hour}:${lot.end.min}:${lot.end.sec}`;
            return `
                <tr class="clickable product_info ${(this.isSold(lot) && 'sold') || ''}">
                    <td>${lot.id}</td>
                    <td>${lot.title}</td>
                    <td>${start}</td>
                    <td>${end}</td>
                    <td>${lot.bid}</td>
                    <td>${lot.price}</td>
                </tr>
                ${!this.isSold(lot) && '<tr class="product_description none">' + 
                    '<td colSpan="6">' +
                        '<div class="description_container">' + 
                            '<span>Description: </span>' +
                            '<div class="description">' + lot.description + '</div>' +
                            '<div class="bid_container">' +
                                '<button class="add_bid_button">place bid</button>' +
                            '</div>' +
                        '</div>' +
                    '</td>' +
                '</tr>' || ''}`
        })
            .join('');
    }

    loadLots() {
        return this.controller.getLots(this.lots.length, this.PACK_SIZE)
            .then(lots => {
                this.lots = this.lots.concat(lots);
            })
            .then(() => {
                let tBody = this.querySelector('.bid_body');
                tBody.innerHTML = this.getLotsTemplate();
                for (let row of this.querySelectorAll('tbody .product_info')) {
                    if (!row.classList.contains('sold')) {
                        row.addEventListener('click', e => {
                            row.nextElementSibling.classList.toggle('none');
                        })
                    }
                }
            })
            .then(() => {
                this.querySelector('.product_load_container').innerHTML = this.numberProducts > this.lots.length ? `<button class="product_load_butt">Load</button>` : '';
            })
            .then(() => {
                let loadButton = this.querySelector('.product_load_butt');
                if (loadButton) {
                loadButton.addEventListener('click', e => {
                        this.loadLots();
                    })
                }
            });

    }

    emmitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {bubbles: true, detail: data});
        this.dispatchEvent(event);
    }

    getTemplate() {

        return `
        <div>
            <table class="product_table">
                <thead>
                    <tr class="product_info">
                        <th>id</th>
                        <th>title</th>
                        <th>start</th>
                        <th>end</th>
                        <th>bid</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody class="bid_body">
                </tbody>
                </table>
                <div class="product_load_container">
                </div>
                <button class="logout_butt">Logout</button>
            </div>
        `
    }
}

customElements.define("bid-page", Bid);