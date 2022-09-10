import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/UserCard.module.css';
import { formatDate, getRandomInt } from '../utils/utils';

interface Props {
	id: number;
	recipientNickname: string;
	lastMessageTimestamp: number;
}

const UserCard: FC = ({ id, recipientNickname, lastMessageTimestamp }: Props) => {
	return (
		<Link href={`/conversation/${id}`}>
			<div className={styles.container + ' lightShadow'}>
				<Image
					src={`https://i.pravatar.cc/150?img=${getRandomInt(1, 69)}`}
					alt="User"
					width={40}
					height={40}
					className={styles.avatar}
				/>
				<div className={styles.user_info}>
					<span className={styles.user_info__name}>{recipientNickname}</span>
					<span className={styles.user_info__lastmessage}>
						{formatDate(lastMessageTimestamp, 'my')}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default UserCard;
