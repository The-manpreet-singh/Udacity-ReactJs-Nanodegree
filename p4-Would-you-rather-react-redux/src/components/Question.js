import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import { Card, Feed, Button } from "semantic-ui-react";

class Question extends Component {
	state = {
		selected: "",
	};

	optionSelectHandler = (value) => {
		this.setState(() => ({
			selected: value,
		}));
	};

	submitHandler = (event) => {
		event.preventDefault();
		const { selected } = this.state;
		const { dispatch, id } = this.props;

		dispatch(handleAddQuestionAnswer(id, selected));
	};
	render() {
		const { authedUserDetails, question, author, id, detailed } = this.props;

		if (!question) {
			return <Redirect to="/404" />;
		}

		return (
			<Card style={{ margin: "20px auto", width: "90%" }}>
				<Card.Content>
					<Card.Header> {author.name} asks:</Card.Header>
				</Card.Content>
				<Card.Content>
					<Feed>
						<Feed.Event>
							<Feed.Label
								style={{ margin: "5px auto", width: "20%" }}
								image={author.avatarURL}
								className="select-avatar"
							/>
							<Feed.Content style={{ margin: "10px 15px" }}>
								<Feed.Date style={{ padding: "3px" }}>
									time: {new Date(question.timestamp).toLocaleDateString()}
								</Feed.Date>

								{detailed ? (
									<Feed.Summary>
										Would you rather... <b>{question.optionOne.text}</b> or <b>{question.optionTwo.text}</b>
									</Feed.Summary>
								) : (
									<div>
										<h4>Would you rather... </h4>
										<p>
											<b> ...{question.optionOne.text}</b> or <b>{question.optionTwo.text}</b>
										</p>
										<Link to={`/questions/${id}`}>
											<Button color="purple" style={{ marginTop: "10px" }}>
												View Poll
											</Button>
										</Link>
									</div>
								)}

								{authedUserDetails.answers[question.id] ? (
									<div style={{ padding: "10px" }}>
										Choosed:
										{question[authedUserDetails.answers[question.id]].text}
										{detailed && (
											<div style={{ padding: "10px" }}>
												Results:
												{question.optionOne.text}
												<ul>
													<li>Votes: {question.optionOne.votes.length}</li>
													<li>
														Percentage:
														{(question.optionOne.votes.length /
															(question.optionOne.votes.length + question.optionTwo.votes.length)) *
															100}
														%
													</li>
												</ul>
												{question.optionTwo.text}
												<ul>
													<li>Votes: {question.optionTwo.votes.length}</li>
													<li>
														Percentage:
														{(question.optionTwo.votes.length /
															(question.optionOne.votes.length + question.optionTwo.votes.length)) *
															100}
														%
													</li>
												</ul>
											</div>
										)}
									</div>
								) : (
									// Question is not answered by user
									<span>
										{detailed ? (
											<form className="ui form" onSubmit={this.submitHandler}>
												<div style={{ padding: "10px" }}>
													<input
														type="radio"
														name="gender"
														id="optionone"
														value="optionOne"
														onChange={(e) => this.optionSelectHandler(e.currentTarget.value)}
													/>
													<label style={{ paddingLeft: "5px" }} htmlFor="optionone">
														{question.optionOne.text}
													</label>
												</div>

												<div style={{ padding: "10px" }}>
													<input
														type="radio"
														name="gender"
														id="optiontwo"
														value="optionTwo"
														onChange={(e) => this.optionSelectHandler(e.currentTarget.value)}
													/>
													<label style={{ paddingLeft: "5px" }} htmlFor="optiontwo">
														{question.optionTwo.text}
													</label>
												</div>

												<button className="ui blue button" type="submit">
													Submit
												</button>
											</form>
										) : null}
									</span>
								)}
							</Feed.Content>
						</Feed.Event>
					</Feed>
				</Card.Content>
			</Card>
		);
	}
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
	const question = questions[id];
	const author = question ? users[question.author] : "";
	const authedUserDetails = users[authedUser];

	return {
		question,
		author,
		authedUserDetails,
	};
}

export default withRouter(connect(mapStateToProps)(Question));
