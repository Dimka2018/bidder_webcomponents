class Bid extends HTMLElement {

    PACK_SIZE = 3;
    controller = new BidController();

    constructor() {
        super();
    }

    connectedCallback() {
        this.loadLots()
            .then(() =>  this.innerHTML = this.getTemplate());
    }

    loadLots() {
        return this.controller.getLots(this.state.lots.length, this.PACK_SIZE)
            .then(lots => {
                this.lots = lots || [];
            })
            .then(() => {
                this.controller.getNumberProducts()
                    .then(numberProducts => {
                        this.numberProducts = numberProducts;
                    })
            });
    }

    getTemplate() {
        let lotTemplates = this.lots.map(lot => `<bid-lot/>`);
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
                <tbody>
                ${lotTemplates}
                </tbody>
                </table>
                <button class="logout_butt">Logout</button>
            </div>
        `
    }
}

customElements.define("bid-page", Bid);