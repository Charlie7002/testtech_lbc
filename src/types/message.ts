export interface Message {
	id: number;
	conversationId: number;
	authorId: number;
	timeStamp: number;
	body: string;
}
