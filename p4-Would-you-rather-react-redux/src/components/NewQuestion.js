import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
	state = {
		optionOne: "",
		optionTwo: "",
		home: false,
	};

	changeHandler = (e, option) => {
		const input = e.target.value;

		this.setState(() => ({
			[option]: input,
		}));
	};

	submitHandler = (e) => {
		e.preventDefault();
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		dispatch(handleAddQuestion(optionOne, optionTwo));

		this.setState(() => ({
			optionOne,
			optionTwo,
			home: true,
		}));
	};

	render() {
		const { optionOne, optionTwo, home } = this.state;

		if (home) {
			return <Redirect to="/" />;
		}

		return (
			<div className="new-question-form">
				<h2>Create a New question</h2>
				<h5>Would you rather...</h5>
				<form className="ui form" onSubmit={this.submitHandler}>
					<div className="field">
						<label>Option One</label>
						<input
							type="text"
							placeholder="Enter option one text"
							onChange={(e) => this.changeHandler(e, "optionOne")}
							defaultValue={optionOne}
						/>
					</div>
					<div className="field">
						<label>Option Two</label>
						<input
							type="text"
							placeholder="Enter option two text"
							onChange={(e) => this.changeHandler(e, "optionTwo")}
							defaultValue={optionTwo}
						/>
					</div>
					<button type="submit" className="ui blue button">
						ADD QUESTION
					</button>
				</form>
			</div>
		);
	}
}

export default connect()(NewQuestion);
