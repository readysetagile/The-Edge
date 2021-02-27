import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import MemberStack from './MemberStack';
import LoginStack from "./LoginStack";
import DashboardStack from "./DashboardStack";
import React from "react";
import colors from "../src/screens/styles";

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
    // "To My Teams": {
    //     screen: LoginStack
    // }

}, DrawerConfig)


export function openMenu(navigation) {
    navigation.openDrawer();
}

export default createAppContainer(TeamDrawerNavigation);
