
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {LoginScreen} from "./src/screens";
import {HomeScreen} from "./src/screens";
import {StatusBar} from 'expo-status-bar';
import React from 'react';


// Set the configuration for your app

export default function App () {

  const Stack = createStackNavigator();

  return (
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Login"
                        component={LoginScreen}>

          </Stack.Screen>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>

      </NavigationContainer>
  );

}
