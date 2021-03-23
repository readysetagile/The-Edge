
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppState} from "react-native";
import {firebase} from "./src/firebase/config";
import Edge from "./src/firebase";
import Login from './routes/LoginStack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './routes/TeamDrawer'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
const { Expo } = require("expo-server-sdk");

// Set the configuration for your app

export default class App extends Component {

    registerForPushNotifications = async () => {
        try {
            const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!permission.granted) return;
            const token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
        } catch (error) {
            console.log('Error getting a token', error);
        }
    }

    componentDidMount () {


        const sendPushNotification = async (targetExpoPushToken, message) => {
            const expo = new Expo();
            const chunks = expo.chunkPushNotifications([
                {to: targetExpoPushToken, sound: "default", body: message}
            ]);
        }
             (async () => {
                const token = await Notifications.getExpoPushTokenAsync().data;
                await sendPushNotification(token, "hello!")
            })()

        this.registerForPushNotifications();
        AppState.addEventListener('change',
            this.handleAppStateChange);
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    /**
     * Detects when the apps state changes for a logout.
     * When the user closes the app and they opted to not be remembered, we will log them out
     * @todo Figure out how to make it so that it detects an actual app quit rather than app inactivity
     * @param nextAppState the next state of the app
     */
    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'inactive') {
            let currentUser = firebase.auth().currentUser;
            if (currentUser != null) {
                Edge.users.get(currentUser.uid).then(r => {
                    if (!r.settings.rememberLogin) {
                        firebase.auth().signOut().catch(console.error);
                    }
                });
            }
        }
    };


    render () {
        return (

            <MenuProvider>
                <ActionSheetProvider>
                    <Login>
                        <Navigator/>
                    </Login>
                </ActionSheetProvider>
            </MenuProvider>
        );
    }
}
