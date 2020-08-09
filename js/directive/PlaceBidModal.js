class PlaceBidModal extends HTMLElement {

    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
            <div class="modal_background">
                <div class="modal_window">
                    <span class="modal_header">{title}</span>
                    <input type="number" class="bid" placeholder={placeholder} onInput={this.onInput}/>
                    <div class="modal_button_container">
                        <button onClick={() => onOkClick(this.state.value)}>{ok}</button>
                        <button onClick={onCancelClick}>{cancel}</button>
                    </div>
                </div>
            </div>
        `;
    }
}