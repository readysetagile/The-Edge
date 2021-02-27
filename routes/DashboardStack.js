import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import {Dashboard} from "../src/screens";
import HeaderBurgerNav from '../src/Components/HeaderBurgerNav';
const screens = {
    Dashboard: {
        screen: Dashboard,
        navigationOptions:{
            headerTitle:() => <HeaderBurgerNav/>
        }
    }
}

const DashboardStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColor: '#444',
        headerStyle:{backgroundColor: '#fefee3'}
    }
})

export default DashboardStack;