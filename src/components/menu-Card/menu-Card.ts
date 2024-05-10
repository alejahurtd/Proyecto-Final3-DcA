import MenuStyle from './menu-Card.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import logoImg from '../../../img/logo.png'; // Usar imports reales
import notificationsIcon from '../../../img/icon-notifications-menu.png';
import homeIcon from '../../../img/icon-home-menu.png';
import profileIcon from '../../../img/icon-profile-menu.png';
export enum Attribute {
	'user' = 'user',
}

class MenuCard extends HTMLElement {
	publication?: string;
	likes?: string;
	user?: string;
	caption?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			user: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
						<style>${MenuStyle}</style>
						<nav class="menu-bar">
								<div class="logo">
										<img src="${logoImg}" alt="logo">
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
		if (homeButton) {
			homeButton.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});
		}

		const profileButton = this.shadowRoot!.querySelector('#profileButton');
		if (profileButton) {
			profileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});
		}
	}
}

customElements.define('menu-card', MenuCard);
export default MenuCard;
