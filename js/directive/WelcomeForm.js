class WelcomeForm extends HTMLElement {

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
            <span class="form_header">${title}</span>
            <input class="form_input" onInput={this.onLoginChange} type="text" placeholder={loginPlaceholder}/>
            <input class="form_input" onInput={this.onPasswordChange} type="password" placeholder={passwordPlaceholder}/>
            <button class="form_button" onClick={this.onButtonClick}>{buttonText}</button>
            <a class="form_link" onClick={onLinkClick}>{linkText}</a>
        </form>
        `
    }
}