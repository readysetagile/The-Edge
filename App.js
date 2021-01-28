
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen, CreateAccountScreen, LoginScreen} from "./src/screens";
import React from 'react';

// Set the configuration for your app

export default function App () {

    const Stack = createStackNavigator();

    //UserAuthentication.createAccount("test@gmail.com", "testpassword");
    //UserAuthentication.signInWithEmailAndPassword("test@gmail.com", "testpassword")
    return (
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Login"
                        component={LoginScreen}>

          </Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Create Account" component={CreateAccountScreen}/>

        </Stack.Navigator>

      </NavigationContainer>
  );

}
