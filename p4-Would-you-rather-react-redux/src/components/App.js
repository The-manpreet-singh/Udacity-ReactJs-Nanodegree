import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { handleInitialData } from "../actions/shared";

import Dashboard from "./Dashboard";

import Signin from "./Signin";

import LoadingBar from "react-redux-loading";

import NewQuestion from "./NewQuestion";

import QuestionDetails from "./QuestionDetails";

import Navbar from "./Navbar";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Leaderboard from "./Leaderboard";

import Error from "./Error";

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<LoadingBar />
				</div>
				{this.props.loading === true ? (
					<Route render={() => <Signin />} />
				) : (
					<Fragment>
						<Navbar authedUser={this.props.authedUser} />
						<Switch>
							<Route path="/" exact component={Dashboard} />
							<Route path="/questions/:id" component={QuestionDetails} />
							<Route path="/add" component={NewQuestion} />
							<Route path="/leaderboard" component={Leaderboard} />
							<Route path="/error" component={Error} />
						</Switch>
					</Fragment>
				)}
			</BrowserRouter>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		loading: authedUser === null,
		authedUser,
	};
}

export default connect(mapStateToProps)(App);
