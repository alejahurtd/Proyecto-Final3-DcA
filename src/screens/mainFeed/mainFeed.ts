import IndexStyle from './mainFeed.css';
import MenuCard, { Attribute as MenuCardAttribute } from '../../components/menu-Card/menu-Card';
import TweetCard, { Attribute as TweetCardAttribute } from '../../components/tweet-Card/tweet-Card';

import PostCard, { Attribute as PostCardCardAttribute } from '../../components/post-Card/post-Card';
import ImgCard, { Attribute as ImgCardAttribute } from '../../components/main-ImgCard/main-ImgCard';
import indexstyles from './mainFeed.css';
import { MenuFeed, tweetCard } from '../../components/export';
//para firebase
import firebase from '../../utils/firebase';
import { getTweet } from '../../utils/firebase';
import { Tweet } from '../../types/Tweet';
import { mainImgCard } from '../../types/main-ImgCard';
import { getmain } from '../../utils/firebase';

//parametros tweet

const dataTweet: Omit<Tweet, 'id'> = {
	user: '',
	img: '',
	message: '',
};

//parametros main.imgCard

const datamain: Omit<mainImgCard, 'id'> = {
	caption: '',
	likes: '',
	publications: '',
	user: '',
};

//Para Firebase

class MainFeed extends HTMLElement {
	tweets: TweetCard[] = [];
	post: ImgCard[] = [];
	dataIndex: number = 0;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	// valores main
	changecaption(e: any) {
		datamain.caption = e.target.value;
	}
	changeMainuser(e: any) {
		datamain.user = e.target.value;
	}
	changelikes(e: any) {
		datamain.likes = e.target.value;
	}
	changepublications(e: any) {
		datamain.publications = e.target.value;
	}

	//valores  tweet
	changeimg(e: any) {
		dataTweet.img = e.target.value;
	}
	changeuser(e: any) {
		dataTweet.user = e.target.value;
	}
	changemessage(e: any) {
		dataTweet.message = e.target.value;
	}

	//valores Audio

	async render() {
		const styleElement = document.createElement('style');
		styleElement.textContent = IndexStyle;
		this.shadowRoot?.appendChild(styleElement);

		const menucard = this.ownerDocument.createElement('menu-card') as MenuCard;
		menucard.setAttribute(MenuCardAttribute.user, '@a.miller');
		this.shadowRoot?.appendChild(menucard);

		const generalContainer = document.createElement('section');
		generalContainer.classList.add('general');
		this.shadowRoot?.appendChild(generalContainer);

		const postcard = this.ownerDocument.createElement('post-card') as PostCard;
		postcard.classList.add('PostCard');
		postcard.setAttribute(PostCardCardAttribute.user, '@a.miller');
		postcard.setAttribute(PostCardCardAttribute.comment, 'Mix&Match');
		postcard.setAttribute(
			PostCardCardAttribute.img,
			'https://m.media-amazon.com/images/I/91LYRChMy-L._SX1248_CR0%2C0%2C1248%2C1248_.jpg'
		);
		generalContainer.appendChild(postcard);

		generalContainer.appendChild(postcard);

		postcard.addEventListener('click', () => {
			const generalContainer = this.shadowRoot?.querySelector('.general');

			// Agrega un nuevo TweetCard
			const newTweetCard = this.ownerDocument.createElement('tweet-card') as TweetCard;
			newTweetCard.setAttribute(TweetCardAttribute.user, '@traveler_adventures');
			newTweetCard.setAttribute(TweetCardAttribute.message, 'I go to the beach!');
			newTweetCard.setAttribute(
				TweetCardAttribute.img,
				'https://i.pinimg.com/564x/08/09/5a/08095a891a2c668646b10975e6ab561e.jpg'
			);
			generalContainer?.appendChild(newTweetCard);

			// Agrega un nuevo ImgCard
			const newImgCard = this.ownerDocument.createElement('main-imgcard') as ImgCard;
			newImgCard.setAttribute(ImgCardAttribute.user, '@fashionista_chic');
			newImgCard.setAttribute(ImgCardAttribute.likes, '3000');
			newImgCard.setAttribute(ImgCardAttribute.caption, 'Sushi feast for dinner! 😋');
			newImgCard.setAttribute(
				ImgCardAttribute.publication,
				'https://i.pinimg.com/736x/96/18/57/9618575d1e790be40cbd79785f905021.jpg'
			);
			generalContainer?.appendChild(newImgCard);
		});
		try {
			const tweetData = await getTweet();
			console.log(tweetData);

			const postData = await getmain(); // Obtener datos de post
			console.log(postData);

			const generalContainer = this.shadowRoot?.querySelector('.general');

			for (let i = 0; i < tweetData.length; i++) {
				const tweetCard = this.ownerDocument.createElement('tweet-card') as TweetCard;
				tweetCard.setAttribute(TweetCardAttribute.img, tweetData[i].img);
				tweetCard.setAttribute(TweetCardAttribute.user, tweetData[i].user);
				tweetCard.setAttribute(TweetCardAttribute.message, tweetData[i].message);
				generalContainer?.appendChild(tweetCard);

				// Añadir ImgCard con los atributos deseados
				const imgCard = this.ownerDocument.createElement('main-imgcard') as ImgCard;
				imgCard.setAttribute(ImgCardAttribute.caption, postData[i].caption);
				imgCard.setAttribute(ImgCardAttribute.user, postData[i].user);
				imgCard.setAttribute(ImgCardAttribute.likes, postData[i].likes);
				imgCard.setAttribute(ImgCardAttribute.publication, postData[i].publications);
				generalContainer?.appendChild(imgCard);
			}
		} catch (error) {
			console.error('Error al obtener datos de tweet:', error);
		}

		try {
			const postData = await getmain();
			console.log(postData);

			// Lógica similar para el manejo de datos de post
		} catch (error) {
			console.error('Error al obtener datos de post:', error);
		}

		const menuPhone = document.createElement('menu-feed') as MenuFeed;
		this.shadowRoot?.appendChild(menuPhone);
	}
}

customElements.define('main-feed', MainFeed);
