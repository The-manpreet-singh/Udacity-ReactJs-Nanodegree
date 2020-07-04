import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { getDeck } from "../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import { white, purple, gray } from "../utils/colors";
import { clearNotification, setNotification } from "../utils/notification";

const Quiz = ({ route, navigation }) => {
	const [initQuestions, setInitQuestions] = useState([]);
	let [initIndex, setInitIndex] = useState(0);
	let [numRight, setNumRight] = useState(0);
	let [quizFinish, setQuizFinish] = useState(false);
	const { title } = route.params;
	let [showAnswer, setShowAnswer] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		clearNotification().then(setNotification);
	}, []);

	function nextCard() {
		if (initQuestions.length === initIndex + 1) {
			setQuizFinish(true);
		} else {
			setInitIndex((initIndex += 1));
		}
		setShowAnswer(false);
	}

	useFocusEffect(() => {
		getDeck(title)
			.then((res) => {
				setInitQuestions(res.questions);
			})
			.then(() => setLoading(false))
			.catch((error) => Alert.alert(error));
	}, [title]);

	function showGiveAnswer() {
		setShowAnswer(true);
	}

	function pressCorrect() {
		setNumRight((numRight += 1));
		nextCard();
	}
	function pressIncorrect() {
		nextCard();
	}
	function startQuiz() {
		setNumRight(0);
		setInitIndex(0);
		setQuizFinish(false);
	}

	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{quizFinish === true ? (
				<View>
					<Text style={[styles.deckTitle, { margin: 25 }]}> Quiz Finish!</Text>
					<Text style={[styles.deckTitle, { margin: 25 }]}>
						you scored: {numRight} of {initQuestions.length}
					</Text>
					<TouchableOpacity onPress={startQuiz} style={styles.button}>
						<Text style={styles.deckSubTitle}>Restart Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("DeckList", { title })} style={styles.button}>
						<Text style={styles.deckSubTitle}>Back to Deck</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.container}>
					<View>
						<Text style={[styles.deckTitle, { margin: 25 }]}>
							question {initIndex + 1} of {initQuestions.length}
						</Text>
					</View>
					{showAnswer === false ? (
						<View style={styles.container}>
							<Text style={[styles.deckTitle, { margin: 25 }]}>{initQuestions[initIndex].question}</Text>
							<TouchableOpacity onPress={showGiveAnswer} style={styles.button}>
								<Text style={styles.deckSubTitle}>Show answer</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={nextCard} style={styles.button}>
								<Text style={styles.deckSubTitle}>Next card</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.container}>
							<Text style={[styles.deckTitle, { margin: 25 }]}>{initQuestions[initIndex].answer}</Text>
							<TouchableOpacity onPress={pressCorrect} style={styles.button}>
								<Text style={styles.deckSubTitle}>correct</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={pressIncorrect} style={styles.button}>
								<Text style={styles.deckSubTitle}>incorrect</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	input: {
		height: 40,
		borderColor: gray,
		borderWidth: 1,
		marginBottom: 20,
		paddingLeft: 3,
		width: 300,
		marginTop: 50,
	},
	deck: {
		width: 250,
		justifyContent: "space-around",
		alignContent: "center",
		backgroundColor: white,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 5,
		padding: 15,
		paddingLeft: 25,
		paddingRight: 25,
		marginBottom: 20,
		marginTop: 20,
	},
	deckTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	deckSubTitle: {
		fontSize: 13,
		fontWeight: "bold",
		paddingTop: 5,
	},

	button: {
		width: 250,
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "center",
		backgroundColor: white,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		paddingLeft: 25,
		paddingRight: 25,
		marginBottom: 25,
	},
});

export default Quiz;
