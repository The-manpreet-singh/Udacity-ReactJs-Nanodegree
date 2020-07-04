export function formatDate(timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString("en-US");

	return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion({ question, optionOneText, optionTwoText, author }) {
	const { id, text, timestamp } = question;
	const { name, avatarURL } = author;

	return {
		name,
		id,
		timestamp,
		text,
		avatar: avatarURL,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		},
	};
}
