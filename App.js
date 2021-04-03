import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppState} from "react-native";
import {firebase} from "./src/firebase/config";
import Edge from "./src/firebase";
import Login from './routes/LoginStack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {MenuProvider} from 'react-native-popup-menu';
import Navigator from './routes/TeamDrawer'
import * as Notifications from 'expo-notifications';
import {hasNotificationPermission} from "./src/firebase/Util";

export default class App extends Component {

    componentDidMount () {
        AppState.addEventListener('change', this.handleAppStateChange);

        firebase.auth().onAuthStateChanged(async (firebaseUser) => {

            const token = await this.getPushToken();
            if(firebaseUser){//log in

                const hasPerms = await hasNotificationPermission();
                if(hasPerms){
                    await firebase.database().ref("Devices").child(firebaseUser.uid).once('value', async snap => {

                        if(snap.val() && Array.isArray(snap.val())){
                            const arr = new Set(snap.val());
                            arr.add(token.data);
                            await firebase.database().ref("Devices").child(firebaseUser.uid).update({pushTokens: arr});
                        }else{
                            await firebase.database().ref("Devices").child(firebaseUser.uid).update({pushTokens: [token.data]});
                        }
                    })
                }

            }else{//the user has logged out

                const user = firebase.auth().currentUser.uid;
                await firebase.database().ref("Devices").child(user).once('value', async snap => {
                    if(snap.val() && Array.isArray(snap.val())){
                        const tokens = snap.val().filter(i => i !== token.data);
                        await firebase.database().ref("Devices").child(user).update({pushTokens: tokens});
                    }

                });
            }

        })

    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    getPushToken = async () => {
        return await Notifications.getExpoPushTokenAsync();
    }

    /**
     * Detects when the apps state changes for a logout.
     * When the user closes the app and they opted to not be remembered, we will log them out
     * @TODO Figure out how to make it so that it detects an actual app quit rather than app inactivity
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
