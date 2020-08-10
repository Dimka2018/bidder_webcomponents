class Welcome extends HTMLElement {

    constructor() {
        super();

        this.error = '';
        this.registrationMode = false;

        this.controller = new WelcomeController();

        this.loginCallbacks = {
            onButtonClick: this.login.bind(this)
        };

        this.registrationCallbacks = {
            onButtonClick: this.register.bind(this),
            onLinkClick: this.toggleMode.bind(this)
        };

    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    toggleMode() {
        for (let form of this.querySelectorAll('welcome-form')) {
            form.classList.toggle('none');
        }
    }

    login(login, password) {
        this.controller.login(login, password)
            .then(() => this.props.history.push("/bid"),
                error => this.setState({error: error}))
    }

    register(login, password) {
        this.controller.register(login, password)
            .then(() => this.login(login, password),
                error => this.error = error)
    }

    getTemplate() {
        return `
        <div>
            <welcome-form class="login_form" title="Log in" loginPlaceholder="login" passwordPlaceholder="password" buttonText="Log in" linkText="Registration"/>
            <welcome-form class="registration_form none" title="Registration" loginPlaceholder="login" passwordPlaceholder="password" buttonText="Registrate" linkText="Log in"/>
            <div class="error_message">${this.error || ''}</div>
        </div>
        `
    }
}

customElements.define('welcome-page', Welcome);