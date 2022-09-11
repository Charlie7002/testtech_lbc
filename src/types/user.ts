import { Conversation } from './conversation';

export interface User {
	id: number;
	nickname: string;
	token: string;
}

export interface UserState {
	userInfo: User | {};
	conversations: Conversation[];
}
export interface UserContextProps {
	user: UserState;
	refresh: boolean;
	setRefresh: (refresh: boolean) => void;
}
