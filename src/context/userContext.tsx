import { createContext, useEffect, useState } from 'react';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import axios from 'axios';

const UserContext = createContext<UserContextProps>(null);
import { UserState, UserContextProps } from '../types/user';

// Default way to get a logged user
export const LoggedUserId = getLoggedUserId();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState<UserState>({ userInfo: {}, conversations: [] });
	const [refresh, setRefresh] = useState(false);

	const userLogged = async () => {
		try {
			await axios
				.get(`http://localhost:3005/users/${LoggedUserId}`)
				.then(res => setUser(prev => ({ ...prev, userInfo: res.data })))
				.catch(err => console.log(err));

			await axios
				.get(`http://localhost:3005/conversations/${LoggedUserId}`)
				.then(res => setUser(prev => ({ ...prev, conversations: res.data })))
				.catch(err => console.log(err));
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		userLogged();
	}, [LoggedUserId, refresh]);

	return (
		<UserContext.Provider value={{ user, refresh, setRefresh }}>{children}</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
