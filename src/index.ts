import './screens/mainFeed/mainFeed';
import indexStyle from './index.css';

import './screens/profile/profile';
import './screens/createAccount/createAccount';
import './screens/settings/settings';
import './screens/passwordScreen/passwordScreen';
import './screens/logIn/logIn';

//Para navegation
import { addObserver } from './store/index';
import { appState } from './store/index';
import { Screens } from './types/store';

//import "./components/export"

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <section></section>
      `;

			console.log(appState.screen);

			switch (appState.screen) {
				case Screens.CREATEACCOUNT:
					const createAccount = this.ownerDocument.createElement('create-account');
					this.shadowRoot?.appendChild(createAccount);
					break;

				case Screens.LOGIN:
					const login = this.ownerDocument.createElement('login-screen');
					this.shadowRoot?.appendChild(login);
					break;

				case Screens.DASHBOARD:
					const mainScreen = this.ownerDocument.createElement('main-feed');
					this.shadowRoot?.appendChild(mainScreen);
					break;

				case Screens.USER_PROFILE:
					const Profile = this.ownerDocument.createElement('profile-screen');
					this.shadowRoot?.appendChild(Profile);
					break;

				case Screens.SETTINGS:
					const settings = this.ownerDocument.createElement('settings-screen');
					this.shadowRoot?.appendChild(settings);
					break;

				case Screens.PASSWORD:
					const passwordScreen = this.ownerDocument.createElement('password-screen');
					this.shadowRoot?.appendChild(passwordScreen);
					break;

				default:
					break;
			}
		}
	}
}

customElements.define('app-container', AppContainer);
