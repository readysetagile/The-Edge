
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import React, {Component} from 'react';
import {AppState} from "react-native";
import {firebase} from "./src/firebase/config";
import Edge from "./src/firebase";
import Login from './routes/LoginStack';

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
        const Stack = createStackNavigator();

        return (
            <Login/>
            // <NavigationContainer>
            //
            //     <Stack.Navigator>
            //         <Stack.Screen name="Login" component={LoginScreen} />
            //         <Stack.Screen name="Home" component={HomeScreen} />
            //         <Stack.Screen name="Create Account" component={CreateAccountScreen} />
            //         <Stack.Screen name="Profiles" component={ProfileScreen} options={{
            //             headerRight: () => (
            //                 <Button
            //                     onPress={() => alert('This is a button!')}
            //                     title="Info"
            //                 />
            //             )
            //         }}/>
            //
            //     </Stack.Navigator>
            //
            // </NavigationContainer>
        );
    }
}
