import { collection, addDoc, getDocs, where, setDoc, getFirestore, onSnapshot, query, doc } from 'firebase/firestore';
import { firebaseConfig } from '../services/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

//Types
import { FeedGrid } from '../types/FeedGrid';
import { initializeApp } from '@firebase/app';
import { Tweet } from '../types/Tweet';
import { mainImgCard } from '../types/main-ImgCard';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth();

//Auth
export const saveUser = async (name: any, email: any, password: any) => {
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			setDoc(doc(db, 'users', name), {
				name: name,
				email: email,
			});
		})
		.catch((error) => {
			console.error('Error al crear usuario:', error.code, error.message);
		});
};

export const getUsers = async (email: any, password: any) => {
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email, password);
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		console.log('se inicio sesion', user);
		return user; // Devuelve el usuario si la autenticación es exitosa
	} catch (error) {
		alert('correo electronico o contraseña invalidos, por favor intentalo de nuevo');
		console.log(`Error al iniciar sesión`, error);
	}
};
//FinAuth

// para tweets
export const addtweet = async (product: Omit<Tweet, 'id'>) => {
	try {
		const where = collection(db, 'Tweet');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getTweet = async () => {
	const querySnapshot = await getDocs(collection(db, 'Tweet'));
	const transformed: Array<Tweet> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<Tweet, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getTweetListener = (cb: (docs: Tweet[]) => void) => {
	const ref = collection(db, 'products');

	onSnapshot(ref, (collection) => {
		const docs: Tweet[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as Tweet[];
		cb(docs);
	});
};
//Fin Tweets

// para main-ImgCards

export const addmain = async (product: Omit<mainImgCard, 'id'>) => {
	try {
		const where = collection(db, 'main-ImgCard');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getmain = async () => {
	const querySnapshot = await getDocs(collection(db, 'main-ImgCard'));
	const transformed: Array<mainImgCard> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<mainImgCard, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getMainListener = (cb: (docs: mainImgCard[]) => void) => {
	const ref = collection(db, 'products');

	onSnapshot(ref, (collection) => {
		const docs: mainImgCard[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as mainImgCard[];
		cb(docs);
	});
};
//Fin ImgCards

//FeedGrid
export const addFeedGrid = async (product: Omit<FeedGrid, 'id'>) => {
	try {
		const where = collection(db, 'FeedGrid');
		await addDoc(where, product);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

export const getFeedGrid = async () => {
	const querySnapshot = await getDocs(collection(db, 'FeedGrid'));
	const transformed: Array<FeedGrid> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<FeedGrid, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

const getFeedGridlistener = (cb: (docs: FeedGrid[]) => void) => {
	const ref = collection(db, 'FeedGrid');

	onSnapshot(ref, (collection) => {
		const docs: FeedGrid[] = collection.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		})) as FeedGrid[];
		cb(docs);
	});
};
//Fin FeedGrid

export default {
	//   CreateAccount,
	//   logIn,
	saveUser,
	getTweet,
	getTweetListener,
	addmain,
	getmain,
	getMainListener,
	addFeedGrid,
	getFeedGrid,
	getFeedGridlistener,
};
