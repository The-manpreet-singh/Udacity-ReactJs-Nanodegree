import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Tab } from "semantic-ui-react";

class Dashboard extends Component {
	render() {
		const panes = [
			{
				menuItem: "Unanswared Questions",
				render: () => (
					<Tab.Pane>
						{this.props.unansweredQuestionIds.map((id) => (
							<div key={id}>
								<Question id={id} />
							</div>
						))}
					</Tab.Pane>
				),
			},
			{
				menuItem: "Answared Questions",
				render: () => (
					<Tab.Pane>
						{this.props.answeredQuestionIds.map((id) => (
							<div key={id}>
								<Question id={id} />
							</div>
						))}
					</Tab.Pane>
				),
			},
		];

		//console.log(data);
		return (
			<div>
				<Tab panes={panes} style={{ margin: "20px auto", width: "70%" }} />
			</div>
		);
	}
}

function mapStateToProps({ questions, authedUser, users }) {
	const answeredQuestionIds = Object.keys(users[authedUser].answers).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp
	);
	const unansweredQuestionIds = Object.keys(questions)
		.filter((q) => !answeredQuestionIds.includes(q))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
	return {
		answeredQuestionIds,
		unansweredQuestionIds,
	};
}

export default connect(mapStateToProps)(Dashboard);
