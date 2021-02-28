import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import MemberStack from './MemberStack';
import DashboardStack from "./DashboardStack";
import React from "react";
import colors from "../src/screens/styles";
import LoginStack from "./LoginStack";

const DrawerConfig = {
    intialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'white',
        },
    },
    contentOptions: {
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
            marginVertical: 10,
        },
        iconContainerStyle: {
            opacity: 1,
        },
    },
    drawerBackgroundColor: colors.titleText,
};

const TeamDrawerNavigation = createDrawerNavigator({

    Dashboard: {
        screen: DashboardStack,
    },
    Members: {
        screen: MemberStack
    },
    // Back: {
    //     screen: LoginStack
    // }

}, DrawerConfig)




export default createAppContainer(TeamDrawerNavigation);
