import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./../Actions/todos";
import { RECEIVE_DATA } from "../Actions/shared";

export default function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return state.concat([action.todo]);
		case REMOVE_TODO:
			return state.filter((todo) => todo.id !== action.id);
		case TOGGLE_TODO:
			return state.map((todo) =>
				todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete })
			);
		case RECEIVE_DATA:
			return action.todos;
		default:
			return state;
	}
}
