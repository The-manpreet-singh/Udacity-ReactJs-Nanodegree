import React, { Component } from "react";

import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Signin extends Component {
	state = {
		selectedUser: "",
	};

	userSelectHandler = (value) => {
		this.setState(() => ({
			selectedUser: value,
		}));
	};

	submitHandler = (e) => {
		e.preventDefault();

		const { dispatch } = this.props;
		dispatch(setAuthedUser(this.state.selectedUser));
	};

	render() {
		const { users } = this.props;

		return (
			<div className="login-form">
				<h2>Please login to continue</h2>
				<form className="ui form">
					<div className="field">
						<select defaultValue="0" onChange={(e) => this.userSelectHandler(e.target.value)}>
							<option value="0" disabled>
								Select User
							</option>
							{users &&
								Object.keys(users).map((user) => (
									<option key={user} value={user}>
										{users[user].name}
									</option>
								))}
						</select>
					</div>

					<button className="ui blue button" onClick={this.submitHandler} disabled={!this.state.selectedUser}>
						Login
					</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users,
	};
}

export default connect(mapStateToProps)(Signin);
