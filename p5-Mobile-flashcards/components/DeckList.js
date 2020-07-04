import React, { useState } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { getDeck } from "../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import { white, purple, gray } from "../utils/colors";

const DeckList = ({ route, navigation }) => {
	const [initDeck, setinitDeck] = useState({});
	const [loading, setLoading] = useState(true);
	const { title } = route.params;

	useFocusEffect(() => {
		getDeck(title)
			.then((res) => {
				setinitDeck(res);
			})
			.then(() => setLoading(false))
			.catch((err) => Alert.alert(err));
	}, [title]);

	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Text style={[styles.deckTitle, { margin: 50 }]}>Number of cards: {initDeck.questions.length}</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("AddQuestion", { title: initDeck.title })}
			>
				<Text>Add Cards</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Quiz", { title: initDeck.title })}>
				<Text>Start Quiz</Text>
			</TouchableOpacity>
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

export default DeckList;
