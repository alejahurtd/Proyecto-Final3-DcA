import poststyles from './post-Card.css';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
	'user' = 'user',
	'comment' = 'comment',
	'img' = 'img',
}

class PostCard extends HTMLElement {
	user?: string;
	comment?: string;
	img?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			user: null,
			comment: null,
			img: null,
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
          <style>
            ${poststyles}
          </style>

  `;
			const container = this.ownerDocument.createElement('section');
			container.className = 'container';

			const userMessage = this.ownerDocument.createElement('section');
			userMessage.className = 'userMessage';

			const userDiv = this.ownerDocument.createElement('div');
			userDiv.className = 'user';
			const userParagraph = this.ownerDocument.createElement('p');
			userParagraph.textContent = '@a.miller'; // Accede a la propiedad user
			userDiv.appendChild(userParagraph);

			const messageDiv = this.ownerDocument.createElement('div');
			messageDiv.className = 'message';
			const messageHeader = this.ownerDocument.createElement('h2');
			messageHeader.textContent = 'Mix&Match'; // Accede a la propiedad comment
			messageDiv.appendChild(messageHeader);

			userMessage.appendChild(userDiv);
			userMessage.appendChild(messageDiv);

			const roundComponents = this.ownerDocument.createElement('section');
			roundComponents.className = 'roundComponents';

			const profileImage = this.ownerDocument.createElement('img');
			profileImage.className = 'profileimg';
			profileImage.src = 'https://m.media-amazon.com/images/I/91LYRChMy-L._SX1248_CR0%2C0%2C1248%2C1248_.jpg';

			const plusImage = this.ownerDocument.createElement('img');
			plusImage.className = 'imgPlus';
			plusImage.src = '/img/plus.png';

			roundComponents.appendChild(profileImage);

			container.appendChild(userMessage);
			container.appendChild(roundComponents);

			const styleElement = document.createElement('style');
			styleElement.textContent = poststyles;

			this.shadowRoot.appendChild(styleElement);
			this.shadowRoot.appendChild(container);
		}
	}
}

customElements.define('post-card', PostCard);
export default PostCard;
