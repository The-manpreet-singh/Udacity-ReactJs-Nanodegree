import React, { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Platform, StyleSheet } from "react-native";
import { white, purple, gray } from "../utils/colors";
import { useFocusEffect } from "@react-navigation/native";
import { getDecks } from "../utils/api";

const DeckListItem = ({ navigation }) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	useFocusEffect(() => {
		getDecks()
			.then((res) => {
				setData(res);
			})
			.then(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				{Object.keys(data).map((deck, idx) => (
					<TouchableOpacity
						style={styles.deck}
						key={idx}
						onPress={() => navigation.navigate("DeckList", { title: deck })}
					>
						<Text style={styles.deckTitle}>{deck}</Text>
						<Text style={styles.deckSubTitle}>
							{data[deck].questions.length} {data[deck].questions.length > 1 ? "cards" : "card"}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
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

export default DeckListItem;
