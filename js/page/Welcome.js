class Welcome extends HTMLElement {

    constructor(props, context) {
        super(props, context);
        this.loginTitles = {
            title: "Log in",
            loginPlaceholder: "login",
            passwordPlaceholder: "password",
            buttonText: "Log in",
            linkText: "Registration"
        };

        this.registrationTitles = {
            title: "Registration",
            loginPlaceholder: "login",
            passwordPlaceholder: "password",
            buttonText: "Registrate",
            linkText: "Log in"
        };

        this.controller = new WelcomeController(React.createContext({}));

        this.loginCallbacks = {
            onButtonClick: this.login.bind(this),
            onLinkClick: this.toggleMode.bind(this)
        };

        this.registrationCallbacks = {
            onButtonClick: this.register.bind(this),
            onLinkClick: this.toggleMode.bind(this)
        };
    }

    connectedCallback() {
        this.innerHTML = this.getTemplate();
    }

    login(login, password) {
        this.controller.login(login, password)
            .then(() => this.props.history.push("/bid"),
                error => this.setState({error: error}))
    }

    register(login, password) {
        this.controller.register(login, password)
            .then(() => this.login(login, password),
                error => this.setState({error: error}))
    }

    state = {
        registrationMode: false,
        error: ""
    };

    toggleMode() {
        this.setState({registrationMode: !this.state.registrationMode})
    }

    getTemplate() {
        return `
        <div>
            {!this.state.registrationMode &&
            <WelcomeForm titles={this.loginTitles} callbacks={this.loginCallbacks}/>}
            {this.state.registrationMode &&
            <WelcomeForm titles={this.registrationTitles} callbacks={this.registrationCallbacks}/>}
            <div class="error_message">{this.state.error}</div>
        </div>
        `
    }
}