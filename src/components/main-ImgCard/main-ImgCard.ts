import CardStyle from './main-ImgCard.css';
import firebase from '../../utils/firebase';

export enum Attribute {
	'publication' = 'publication',
	'likes' = 'likes',
	'user' = 'user',
	'caption' = 'caption',
}

class ImgCard extends HTMLElement {
	publication?: string;
	likes?: string;
	user?: string;
	caption?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			publication: null,
			likes: null,
			user: null,
			caption: null,
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
        ${CardStyle}
    </style>
`;
			const section = this.ownerDocument.createElement('section');
			const bodyCard = this.ownerDocument.createElement('div');
			bodyCard.className = 'body-card';

			const postImage = this.ownerDocument.createElement('img');
			postImage.className = 'post-img';
			postImage.src = `${this.publication}`;

			postImage.addEventListener('click', () => {
				// Crear  ventana emergente para mostrar la imagen más grande
				const modal = this.ownerDocument.createElement('div');
				modal.classList.add('modal');

				const modalImage = this.ownerDocument.createElement('img');
				modalImage.src = `${this.publication}`;

				modal.appendChild(modalImage);

				this.shadowRoot?.appendChild(modal);

				modal.addEventListener('click', () => {
					modal.remove();
				});
			});

			const iconDiv = this.ownerDocument.createElement('div');
			iconDiv.className = 'icon';

			const rightDiv = this.ownerDocument.createElement('div');
			rightDiv.className = 'right';

			const iconDefault = this.ownerDocument.createElement('img');
			iconDefault.src = '/img/Icondefault.png';
			iconDefault.addEventListener('click', () => {
				iconDefault.src = '/img/Icon.png';
			});

			const iconComment = this.ownerDocument.createElement('img');
			iconComment.src = '/img/Iconcomment.png';

			const iconShare = this.ownerDocument.createElement('img');
			iconShare.src = '/img/Iconshare.png';

			const iconSave = this.ownerDocument.createElement('img');
			iconSave.src = '/img/Iconsave.png';
			iconSave.addEventListener('click', () => {
				iconSave.src = '/img/saveB.png';
			});

			const buttonInfo = this.ownerDocument.createElement('div');
			buttonInfo.className = 'button-info';

			const likesSpan = this.ownerDocument.createElement('span');
			likesSpan.textContent = `${this.likes} likes`;

			const userInfo = this.ownerDocument.createElement('p');
			const userName = this.ownerDocument.createElement('strong');
			userName.textContent = `${this.user}`;

			const userCaption = this.ownerDocument.createElement('br');
			const captionText = this.ownerDocument.createElement('p');
			captionText.textContent = `${this.caption}`;
			userInfo.appendChild(userName);
			userInfo.appendChild(userCaption);
			userInfo.appendChild(captionText);

			const inputContainer = this.ownerDocument.createElement('div');
			inputContainer.classList.add('inputContainer');

			const addCommentLink = this.ownerDocument.createElement('input');
			addCommentLink.classList.add('inputComment');
			addCommentLink.placeholder = 'Add a comment';

			const submitButton = this.ownerDocument.createElement('button');
			submitButton.classList.add('buttoncommet');
			submitButton.innerText = 'Submit';

			inputContainer.appendChild(submitButton);
			buttonInfo.appendChild(inputContainer);

			section.appendChild(bodyCard);
			bodyCard.appendChild(postImage);
			bodyCard.appendChild(iconDiv);
			iconDiv.appendChild(rightDiv);
			rightDiv.appendChild(iconDefault);
			rightDiv.appendChild(iconComment);
			rightDiv.appendChild(iconShare);
			iconDiv.appendChild(iconSave);
			bodyCard.appendChild(buttonInfo);
			buttonInfo.appendChild(likesSpan);
			buttonInfo.appendChild(userInfo);
			buttonInfo.appendChild(inputContainer);
			buttonInfo.appendChild(addCommentLink);
			buttonInfo.appendChild(submitButton);

			// Agrega la sección al shadow DOM
			this.shadowRoot.appendChild(section);
		}
	}
}

customElements.define('main-imgcard', ImgCard);
export default ImgCard;
