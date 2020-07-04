import { AsyncStorage } from "react-native";
import { decks } from "./_DATA";

const STORAGE_KEY = "MobileFlashcards:decks";
/**
 * This file contain different api requests using data from _DATA.js file
 */
export function getData() {
	return decks;
}

export async function getDecks() {
	try {
		const result = await AsyncStorage.getItem(STORAGE_KEY);

		if (result === null) {
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
		}
		if (result === null) {
			return decks;
		} else {
			return JSON.parse(result);
		}
	} catch (error) {
		console.warn(error);
	}
}

export async function getDeck(id) {
	try {
		const result = await AsyncStorage.getItem(STORAGE_KEY);
		return JSON.parse(result)[id];
	} catch (error) {
		console.warn(error);
	}
}

export async function saveDeck(title) {
	try {
		await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [title]: { title, questions: [] } }));
	} catch (error) {
		console.warn(error);
	}
}

export async function addCardToDeck(title, card) {
	try {
		//get the deck to work with
		const deck = await getDeck(title);

		AsyncStorage.mergeItem(
			STORAGE_KEY,
			JSON.stringify({
				[title]: {
					questions: [...deck.questions].concat(card),
				},
			})
		);
	} catch (error) {
		console.warn(error);
	}
}

export async function reloadDecks() {
	try {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
	} catch (error) {
		console.log(error);
	}
}
