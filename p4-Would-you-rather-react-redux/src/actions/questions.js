import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function addQuestionAnswer(authedUser, qid, answer) {
	return {
		type: ADD_QUESTION_ANSWER,
		authedUser,
		qid,
		answer,
	};
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser,
		})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	};
}

export function handleAddQuestionAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestionAnswer({
			authedUser,
			qid,
			answer,
		})
			.then(() => dispatch(addQuestionAnswer(authedUser, qid, answer)))
			.then(() => dispatch(hideLoading()));
	};
}
