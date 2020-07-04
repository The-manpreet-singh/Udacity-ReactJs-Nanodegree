import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { white, purple, gray } from "./utils/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import DeckList from "./components/DeckList";
import DeckListItem from "./components/DeckListItem";
import AddDeck from "./components/AddDeck";
import AddQuestion from "./components/AddQuestion";
import Quiz from "./components/Quiz";
import { setNotification, clearNotification } from "./utils/notification";

const Home = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="DeckListItem"
				component={DeckListItem}
				options={{
					tabBarLabel: "Deck List Item",
					tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
				}}
			/>
			<Tab.Screen
				name="AddDeck"
				component={AddDeck}
				options={{
					tabBarLabel: "Add Deck",
					tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default function App() {
	useEffect(() => {
		setNotification();
	}, []);

	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} options={{ title: "Deck List" }} />
				<Stack.Screen name="DeckList" component={DeckList} options={({ route }) => ({ title: route.params.title })} />
				<Stack.Screen
					name="AddQuestion"
					component={AddQuestion}
					options={({ route }) => ({ title: route.params.title })}
				/>
				<Stack.Screen name="Quiz" component={Quiz} options={({ route }) => ({ title: route.params.title + " Quiz" })} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

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
