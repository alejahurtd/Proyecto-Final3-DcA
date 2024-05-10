export type Observer = { render: () => void } & HTMLElement;

export enum Screens {
	LOGIN = 'LOGIN',
	CREATEACCOUNT = 'CREATEACCOUNT',
	DASHBOARD = 'DASHBOARD',
	USER_PROFILE = 'USER_PROFILE',
	SETTINGS = 'SETTINGS',
	PASSWORD = 'PASSWORD',
}
const get = <T>({ key, defaultValue }: { key: Screens; defaultValue: T }): T => {
	const value = localStorage.getItem(key) || sessionStorage.getItem(key);
	return value ? JSON.parse(value) : defaultValue;
};
const set = ({ key, value, session = false }: { key: Screens; value: unknown; session?: boolean }) => {
	const storage = session ? sessionStorage : localStorage;
	const parsed = JSON.stringify(value);
	storage.setItem(key, parsed);
};

export default {
	get,
	set,
};
export type AppState = {
	screen: Screens;
};

export enum NavigationActions {
	'NAVIGATE' = 'NAVIGATE',
}

export interface NavigateAction {
	action: NavigationActions.NAVIGATE;
	payload: Screens;
}

export type Actions = NavigateAction;
