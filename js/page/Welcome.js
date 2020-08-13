class Welcome extends HTMLElement {

    constructor() {
        super();
        this.controller = new WelcomeController();
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
        this.addEventListener('toggle', e => {
            this.toggleMode();
        }, false);
        this.addEventListener('login', e => {
            this.login(e.detail.login, e.detail.password)
        }, false);
        this.addEventListener('register', e => {
            this.register(e.detail.login, e.detail.password)
        }, false)
    }

    toggleMode() {
        for (let form of this.querySelectorAll('welcome-form')) {
            form.classList.toggle('none');
        }
    }

    login(login, password) {
        this.controller.login(login, password)
            .then(() => this.emmitEvent('loggedIn'),
                error => this.showError(error))
    }

    register(login, password) {
        this.controller.register(login, password)
            .then(() => this.login(login, password),
                error => this.showError(error))
    }

    showError(error) {
        this.querySelector('.error_message').innerText = error;
    }

    emmitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {bubbles: true, detail: data});
        this.dispatchEvent(event);
    }

    getTemplate() {
        return `
            <welcome-form class="login_form" title="Log in" loginPlaceholder="login" passwordPlaceholder="password" buttonText="Log in" linkText="Registration"
            linkEvent="toggle" buttonEvent="login"></welcome-form>
            <welcome-form class="registration_form none" title="Registration" loginPlaceholder="login" passwordPlaceholder="password" buttonText="Registrate" linkText="Log in"
            linkEvent="toggle" buttonEvent="register"></welcome-form>
            <div class="error_message"></div>
        `
    }
}

customElements.define('welcome-page', Welcome);