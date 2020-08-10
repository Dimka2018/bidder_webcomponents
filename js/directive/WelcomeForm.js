class WelcomeForm extends HTMLElement {

    constructor() {
        super();
        this.title = this.getAttribute('title');
        this.loginPlaceholder = this.getAttribute('loginPlaceholder');
        this.passwordPlaceholder = this.getAttribute('passwordPlaceholder');
        this.buttonText = this.getAttribute('buttonText');
        this.linkText = this.getAttribute('linkText');
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    onLoginChange = event => {
        this.setState({login: event.target.value});
    };

    onPasswordChange = event => {
        this.setState({password: event.target.value});
    };

    onButtonClick = event => {
        event.preventDefault();
        this.props.callbacks.onButtonClick(this.state.login, this.state.password);
    };

    getTemplate() {
        return `
        <form class="user_form">
            <span class="form_header">${this.title}</span>
            <input class="form_input" type='text' placeholder=${this.loginPlaceholder} />
            <input class="form_input" type="password" placeholder=${this.passwordPlaceholder} />
            <button class="form_button">${this.buttonText}</button>
            <a class="form_link">${this.linkText}</a>
        </form>
        `
    }
}

customElements.define('welcome-form', WelcomeForm);