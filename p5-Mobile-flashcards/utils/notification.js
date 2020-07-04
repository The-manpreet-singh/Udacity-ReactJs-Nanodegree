import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "Mobile_Flashcard:notifications";
const CHANNEL_ID = "Reminder";

function createNotification() {
	return {
		title: "Reminder",
		body: "👋 Don't forget to study today!",

		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: "high",
			sticky: false,
			vibrate: true,
		},
	};
}

function createChannel() {
	return {
		name: "Daily Quiz",
		description: "A daily reminder to take the quiz.",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: "high",
			sticky: false,
			vibrate: true,
		},
	};
}
export function clearNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
							.then((val) => console.log("channel return:", val))
							.then(() => {
								Notifications.cancelAllScheduledNotificationsAsync();

								const tomorrow = new Date();
								tomorrow.setDate(tomorrow.getDate() + 1);
								tomorrow.setHours(20);
								tomorrow.setMinutes(0);

								Notifications.scheduleLocalNotificationAsync(createNotification(), {
									time: tomorrow,
									repeat: "day",
								});

								AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
							})
							.catch((error) => {
								console.log("error", error);
							});
					}
				});
			} else {
				console.log("notification set");
			}
		});
}
