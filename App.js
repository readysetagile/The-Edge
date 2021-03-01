
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppState} from "react-native";
import {firebase} from "./src/firebase/config";
import Edge from "./src/firebase";
import Login from './routes/LoginStack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import DrawerNav from './routes/TeamDrawer'
import TabNav from './routes/QuestionTabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {HomeScreen} from "./src/screens";

// Set the configuration for your app

export default class App extends Component {

    componentDidMount () {
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
                        <DrawerNav>
                            <TabNav/>
                        </DrawerNav>
                    </Login>
                </ActionSheetProvider>
            </MenuProvider>
        );
    }
}
