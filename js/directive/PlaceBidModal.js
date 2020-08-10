class PlaceBidModal extends HTMLElement {

    constructor() {
        super();
        this.title = this.getAttribute('title');
        this.placeholder = this.getAttribute('placeholder');
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
            <div class="modal_background">
                <div class="modal_window">
                    <span class="modal_header">${this.title}</span>
                    <input type="number" class="bid" placeholder=${this.placeholder}/>
                    <div class="modal_button_container">
                        <button onClick={() => onOkClick(this.state.value)}>{ok}</button>
                        <button onClick={onCancelClick}>{cancel}</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('place-bid-modal', PlaceBidModal);