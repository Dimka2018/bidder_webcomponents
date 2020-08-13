class WelcomeForm extends HTMLElement {

    constructor() {
        super();
        this.title = this.getAttribute('title');
        this.loginPlaceholder = this.getAttribute('loginPlaceholder');
        this.passwordPlaceholder = this.getAttribute('passwordPlaceholder');
        this.buttonText = this.getAttribute('buttonText');
        this.linkText = this.getAttribute('linkText');

        this.linkEvent = this.getAttribute('linkEvent');
        this.buttonEvent = this.getAttribute('buttonEvent');
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
        this.querySelector('.form_link').addEventListener('click', e => {
            this.emmitEvent(this.linkEvent)
        }, false);
        this.querySelector('.form_button').addEventListener('click', e => {
            e.preventDefault();
            let login = this.querySelector('.login_input').value;
            let password = this.querySelector('.password_input').value;
            this.emmitEvent(this.buttonEvent, {login: login, password: password})
        }, false);
    }

    emmitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {bubbles: true, detail: data});
        this.dispatchEvent(event);
    }

    getTemplate() {
        return `
        <form class="user_form">
            <span class="form_header">${this.title}</span>
            <input class="form_input login_input" type='text' placeholder=${this.loginPlaceholder} />
            <input class="form_input password_input" type="password" placeholder=${this.passwordPlaceholder} />
            <button class="form_button">${this.buttonText}</button>
            <a class="form_link">${this.linkText}</a>
        </form>
        `
    }
}

customElements.define('welcome-form', WelcomeForm);