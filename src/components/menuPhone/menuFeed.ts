import MenuStyle from './Menu.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import logoImg from '../../../img/logo.png';
import notificationsIcon from '../../../img/icon notifications.png';
import homeIcon from '../../../img/icon home.png';
import profileIcon from '../../../img/icon profile.png';

class MenuFeed extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const styleElement = document.createElement('style');
			styleElement.textContent = MenuStyle;
			this.shadowRoot.appendChild(styleElement);

			this.shadowRoot.innerHTML += `
				<nav class="menu-bar">
					<div class="logo">
					<img src="${new URL(logoImg).href}" alt="logo">
					</div>
					<div class="search-box">
						<input type="text" class="search-box-input" placeholder="Search...">
					</div>
					<div class="icons">
						<img src="${notificationsIcon}" alt="Icono notificaciones" class="icon">
						<img src="${homeIcon}" alt="Icono home" class="icon home-icon" id="homeButton">
						<img src="${profileIcon}" alt="Icono profile" class="icon profile-icon" id="profileButton">
					</div>
				</nav>
				<div class="line-separator"></div>
			`;
			this.setupEventListeners();
		}
	}

	setupEventListeners() {
		const homeButton = this.shadowRoot!.querySelector('#homeButton');
		const profileButton = this.shadowRoot!.querySelector('#profileButton');

		if (homeButton) {
			homeButton.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});
		}
		if (profileButton) {
			profileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});
		}
	}
}

customElements.define('menu-feed', MenuFeed);
export default MenuFeed;
