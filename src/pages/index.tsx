import { FC, useContext } from 'react';
import styles from '../styles/Home.module.css';
import { Conversation } from '../types/conversation';
import UserCard from '../components/UserCard';
import { UserContext } from '../context/userContext';

const Home: FC = () => {
	const { user } = useContext<any>(UserContext);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Hello <span className={styles.userName}>{user.userInfo.nickname}</span> :){' '}
			</div>
			<div className={styles.cardList}>
				{user.conversations?.map((conv: Conversation) => (
					<UserCard key={conv.id} {...conv} />
				))}
			</div>
		</div>
	);
};

export default Home;
