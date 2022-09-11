import { FC, useContext, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import styles from '../styles/SendMessage.module.css';

import { UserContext } from '../context/userContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const SendMessage: FC<any> = ({ convId }) => {
	const { user, setRefresh, refresh } = useContext<any>(UserContext);
	const router = useRouter();
	const [value, setValue] = useState('');

	const handleChange = (e: any) => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const handleClick = (e: any) => {
		e.preventDefault();
		const message = {
			body: value,
		};

		postMessage(convId, message);
	};

	const postMessage = async (id, message) => {
		if (id !== null && message !== '') {
			const { body } = message;
			try {
				const res = await axios.post(`http://localhost:3005/messages/${id}`, {
					body,
					conversationId: id,
					timeStamp: Math.floor(Date.now() / 1000),
					authorId: user.userInfo.id,
				});
				setValue('');
				res.status === 201 && router.push(`/conversation/${id}`);
				setRefresh(!refresh);
			} catch (err) {
				console.log(message.err);
			}
		}
	};

	return (
		<div className={styles.send}>
			<form action="">
				<input
					type="text"
					value={value}
					onChange={e => handleChange(e)}
					placeholder="Send message"
				/>
				<div className={styles.send_btn}>
					<IoSendSharp color="#703efe" fill="#703efe" size="35px" onClick={handleClick} />
				</div>
			</form>
		</div>
	);
};

export default SendMessage;
