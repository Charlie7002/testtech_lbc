import { FC, useContext } from 'react';
import styles from '../styles/Home.module.css';
import { Conversation } from '../types/conversation';
import UserCard from '../components/UserCard';
import { UserContext } from '../context/userContext';

// interface Props {
// 	conversations: Conversation[];
// }

const Home: FC = () => {
	const { conversations, userInfo } = useContext<any>(UserContext);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Hello <span className={styles.userName}>{userInfo.nickname}</span> :){' '}
			</div>
			<div className={styles.cardList}>
				{conversations?.map((conv: Conversation) => (
					<UserCard key={conv.id} {...conv} />
				))}
			</div>
		</div>
	);
};

export default Home;
