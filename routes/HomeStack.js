import {createStackNavigator} from 'react-navigation-stack';
import {CreateAccountScreen, LoginScreen, ProfileScreen, CreateProfileScreen, HomeScreen, Dashboard} from "../src/screens";
import Header from '../src/Components/Header';
import React from 'react';


const onAddProfile = (navigation) => {
    navigation.navigate("Create_Profile");
}

const screens = {
    Home:{
        screen: HomeScreen,
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColor: '#444',
        headerStyle:{backgroundColor: '#fefee3'}
    }
});


export default HomeStack;