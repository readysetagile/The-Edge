import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {CreateAccountScreen, LoginScreen, ProfileScreen, CreateProfileScreen} from "../src/screens";
import Header from '../src/Components/Header';
import React from 'react';


const onAddProfile = (navigation) => {
    navigation.navigate("Create_Profile");
}

const screens = {
    Login: {
        screen: LoginScreen
    },
    Create_Account:{
        screen: CreateAccountScreen,
        navigationOptions:{
            title: "Create Account"
        }
    },
    Profiles:{
        screen: ProfileScreen,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <Header navigation={navigation} title={"Profiles"} onPressAdd={() => onAddProfile(navigation)}/>,
            }
        }
    },
    Create_Profile:{
        screen: CreateProfileScreen
    }
}


const LoginStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColor: '#444',
        headerStyle:{backgroundColor: '#fefee3'}
    }
});


export default createAppContainer(LoginStack);