import { createContext, useEffect, useState } from 'react';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import axios from 'axios';

const UserContext = createContext('');

// Default way to get a logged user
export const LoggedUserId = getLoggedUserId();

const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(LoggedUserId);
	const [user, setUser] = useState<any>({ userInfo: {}, conversations: [] });

	const userLogged = async () => {
		console.log('userLogged');
		await axios
			.get(`http://localhost:3005/users/${LoggedUserId}`)
			.then(res => setUser({ userInfo: res.data }))
			.catch(err => console.log(err));

		await axios
			.get(`http://localhost:3005/conversations/${LoggedUserId}`)
			.then(res => setUser(prev => ({ ...prev, conversations: res.data })))
			.catch(err => console.log(err));
	};

	useEffect(() => {
		userLogged();
	}, [LoggedUserId]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
