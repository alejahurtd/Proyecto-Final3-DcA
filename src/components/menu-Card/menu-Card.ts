import MenuStyle from './menu-Card.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

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
			this.shadowRoot.innerHTML = ``;

			const styleElement = document.createElement('style');
			styleElement.textContent = MenuStyle;
			this.shadowRoot?.appendChild(styleElement);

			const containerLogo = this.ownerDocument.createElement('div');
			containerLogo.classList.add('icon');

			const logo = this.ownerDocument.createElement('img');
			logo.src = '/img/raw.png';
			logo.classList.add('logo-completo');
			containerLogo.appendChild(logo);
			logo.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			this.shadowRoot?.appendChild(containerLogo);

			const left = this.ownerDocument.createElement('div');
			left.classList.add('left');

			const notificationButton = this.ownerDocument.createElement('img');
			notificationButton.src = '/img/notifications.png';
			notificationButton.classList.add('icons');
			left.appendChild(notificationButton);

			const profileButton = this.ownerDocument.createElement('img');
			profileButton.src = 'https://m.media-amazon.com/images/I/91LYRChMy-L._SX1248_CR0%2C0%2C1248%2C1248_.jpg';
			profileButton.classList.add('user');
			left.appendChild(profileButton);
			profileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			containerLogo.appendChild(left);
		}
	}
}

customElements.define('menu-card', MenuCard);
export default MenuCard;
