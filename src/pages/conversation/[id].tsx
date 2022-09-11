import { FC, useContext } from 'react';
import { Message } from '../../types/message';
import styles from '../../styles/Chat.module.css';
import { UserContext } from '../../context/userContext';
import { formatDate } from '../../utils/utils';
import SendMessage from '../../components/SendMessage';
import { useRouter } from 'next/router';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

interface Props {
	messages: Message[];
}

const Chat: FC = ({ messages }: Props) => {
	const { user } = useContext<any>(UserContext);
	const router = useRouter();
	const { id } = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.title_back}>
					<IoArrowBackCircleSharp
						color="#703efe"
						fill="#703efe"
						size="40px"
						onClick={() => router.back()}
					/>
				</div>
				<div className={styles.title_userInfo}>
					<h6 className={styles.title_userInfo__name}>
						{user.userInfo.nickname} <span>- You</span>
					</h6>
					<div>
						{messages && messages.length > 0 && (
							<span>
								Last message : {formatDate(messages[messages.length - 1].timeStamp, 'my')}{' '}
							</span>
						)}
					</div>
				</div>
			</div>
			<div className={styles.messages_container}>
				<div className={styles.messages_container_box}>
					{messages.length > 0 &&
						messages.map((message: Message) => (
							<div
								key={message.id}
								style={{
									justifyContent:
										user.userInfo.id == message.authorId ? 'flex-end' : 'flex-start',
									left: user.userInfo.id == message.authorId ? '0' : '-50px',
								}}
								className={styles.message}
							>
								<span
									style={{
										background:
											user.userInfo.id == message.authorId
												? 'var(--primary)'
												: 'var(--primary-light)',
										color: user.userInfo.id == message.authorId ? 'white' : 'var(--font)',
									}}
								>
									{message.body}
								</span>
							</div>
						))}
					{messages.length == 0 && <div>No messages yet</div>}
				</div>

				<div className={styles.messages_send}>
					<SendMessage convId={id} />
				</div>
			</div>
		</div>
	);
};

export async function getServerSideProps({ params }) {
	const { id } = params;
	try {
		const res = await fetch(`http://localhost:3005/messages/${id}`);
		const data = await res.json();
		return { props: { messages: data } };
	} catch (err) {
		console.log(err.message);
	}
}

export default Chat;
