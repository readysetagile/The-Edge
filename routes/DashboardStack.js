import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import {Dashboard} from "../src/screens";
import HeaderBurgerNav from '../src/Components/HeaderBurgerNav';
import {openMenu} from "./TeamDrawer";
const screens = {
    Dashboard: {
        screen: Dashboard,
        navigationOptions: ({navigation}) => {
            return{
                headerTitle: () => <HeaderBurgerNav onPress={() => openMenu(navigation)}/>
            }
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