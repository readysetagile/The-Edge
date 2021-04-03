import {Alert} from "react-native";
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

/**
 * Creates a new unique ID
 * @param string [xxxx-xxxx-xxxx-xxxx] replaces any 'x' found in this string with a random character. Otherwise returns a uniuqe string
 * @returns {string} a randomly generated unique ID
 */
export function createUUID(string = 'xxxx-xxxx-xxxx-xxxx') {
    let dt = new Date().getTime();
    const uuid = string.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export async function sendNotifications(expo, messages) {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error("error sending notifications", error);
        }
    }

    return tickets;
}

export async function getPushNotificationPermissions(){
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    console.log("Notification Token: ", await Notifications.getExpoPushTokenAsync());
}


export async function hasNotificationPermission(){
    try {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        // If we don't already have permission, ask for it
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus === 'granted') return true;
        if (finalStatus !== 'granted') {
            Alert.alert(
                'Warning',
                'You will not receive reminders if you do not enable push notifications. If you would like to receive reminders, please enable push notifications for Fin in your settings.',
                [
                    { text: 'Cancel' },
                    // If they said no initially and want to change their mind,
                    // we can automatically open our app in their settings
                    // so there's less friction in turning notifications on
                    { text: 'Enable Notifications', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
                ]
            )
            return false;
        }
    } catch (error) {
        Alert.alert(
            'Error',
            'Something went wrong while check your notification permissions, please try again later.'
        );
        return false;
    }
}


export function openMenu(navigation) {
    navigation.openDrawer();
}