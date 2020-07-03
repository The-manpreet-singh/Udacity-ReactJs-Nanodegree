import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Feed } from "semantic-ui-react";

class Leaderboard extends Component {
	render() {
		const { leaderboardData } = this.props;

		return (
			<div>
				{leaderboardData
					? leaderboardData.map((user) => (
							<Card key={user.id} style={{ margin: "20px auto", width: "70%" }}>
								<Card.Content>
									<Feed>
										<Feed.Event>
											<Feed.Label
												style={{ margin: "5px auto", width: "20%" }}
												image={user.avatarURL}
												className="select-avatar"
											/>
											<Feed.Content style={{ margin: "10px 15px" }}>
												<Feed.Summary style={{ padding: "3px" }}>{user.name}</Feed.Summary>
												<Feed.Summary style={{ padding: "3px" }}>
													Answered Questions: {user.answeredQuestions}
												</Feed.Summary>
												<Feed.Summary style={{ padding: "3px" }}>
													Created Questions: {user.createdQuestions}
												</Feed.Summary>
												<Feed.Summary style={{ padding: "3px" }}>
													Total: {user.answeredQuestions + user.createdQuestions}
												</Feed.Summary>
											</Feed.Content>
										</Feed.Event>
									</Feed>
								</Card.Content>
							</Card>
					  ))
					: null}
			</div>
		);
	}
}

function mapStateToProps({ authedUser, users, questions }) {
	const leaderboardData = Object.keys(users)
		.map((user) => ({
			id: user,
			name: users[user].name,
			avatarURL: users[user].avatarURL,
			answeredQuestions: Object.keys(users[user].answers).length,
			createdQuestions: Object.keys(questions).filter((q) => questions[q].author === user).length,
		}))
		.sort((a, b) => b.answeredQuestions + b.createdQuestions - (a.answeredQuestions + a.createdQuestions));

	return {
		authedUser,
		leaderboardData,
	};
}

export default connect(mapStateToProps)(Leaderboard);
