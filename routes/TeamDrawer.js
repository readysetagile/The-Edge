import { createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer, NavigationActions} from 'react-navigation';
import {Dashboard, Members} from "../src/screens";
import MemberStack from './MemberStack';
import LoginStack from "./LoginStack";
import DashboardStack from "./DashboardStack";
import HeaderBurgerNav from "../src/Components/HeaderBurgerNav";
import React from "react";


const TeamDrawerNavigation = createDrawerNavigator({

    Dashboard:{
        screen: DashboardStack,
    },
    Members:{
        screen: MemberStack
    },
    "To My Teams":{
        screen: LoginStack
    }

})

export function openMenu(navigation){
    navigation.openDrawer();
}

export default createAppContainer(TeamDrawerNavigation);