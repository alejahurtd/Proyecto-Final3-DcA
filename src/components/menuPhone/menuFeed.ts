import MenuStyle from './Menu.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
}

class MenuFeed extends HTMLElement {
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

			const container = this.ownerDocument.createElement('div');
			container.classList.add('generalContainer');
			this.shadowRoot?.appendChild(container);

			const listIcons = this.ownerDocument.createElement('ul');
			listIcons.classList.add('list');

			const searchButton = this.ownerDocument.createElement('img');
			searchButton.src = '/img/icon-search-menu.png';
			searchButton.classList.add('icons');
			listIcons.appendChild(searchButton);

			const notificationButton = this.ownerDocument.createElement('img');
			notificationButton.src = '/img/icon-notifications-menu.png';
			notificationButton.classList.add('icons');
			listIcons.appendChild(notificationButton);

			const homeButton = this.ownerDocument.createElement('img');
			homeButton.src = '/img/icon-home-menu.png';
			homeButton.classList.add('iconsSelection');
			listIcons.appendChild(homeButton);
			homeButton.addEventListener('click', () => {
				dispatch(navigate(Screens.DASHBOARD));
			});

			const profileButton = this.ownerDocument.createElement('img');
			profileButton.src = 'https://m.media-amazon.com/images/I/91LYRChMy-L._SX1248_CR0%2C0%2C1248%2C1248_.jpg';
			profileButton.classList.add('user');
			listIcons.appendChild(profileButton);
			profileButton.addEventListener('click', () => {
				dispatch(navigate(Screens.USER_PROFILE));
			});

			container.appendChild(listIcons);
		}
	}
}

customElements.define('menu-feed', MenuFeed);
export default MenuFeed;
