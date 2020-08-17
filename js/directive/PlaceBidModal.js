class PlaceBidModal extends HTMLElement {

    constructor() {
        super();
        this.title = this.getAttribute('title');
        this.placeholder = this.getAttribute('placeholder');

        this.okEvent = this.getAttribute('okEvent');
        this.cancelEvent = this.getAttribute('cancelEvent');
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
        this.querySelector('.ok_button').addEventListener('click', e => {
            this.emmitEvent(this.okEvent, {bid: this.querySelector('.bid').value});
        });
        this.querySelector('.cancel_button').addEventListener('click', e => {
            this.emmitEvent(this.cancelEvent);
        })
    }

    emmitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {bubbles: true, detail: data});
        this.dispatchEvent(event);
    }

    getTemplate() {
        return `
            <div class="modal_background">
                <div class="modal_window">
                    <span class="modal_header">${this.title}</span>
                    <input type="number" class="bid" placeholder=${this.placeholder} />
                    <div class="modal_button_container">
                        <button class="ok_button">ok</button>
                        <button class="cancel_button">cancel</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('place-bid-modal', PlaceBidModal);