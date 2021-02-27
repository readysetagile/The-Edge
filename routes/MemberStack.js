import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import {Members} from "../src/screens";
import HeaderBurgerNav from "../src/Components/HeaderBurgerNav";
import {openMenu} from "./TeamDrawer";

const screens = {
    Members: {
        screen: Members,
        navigationOptions: ({navigation}) => {
                return{
                    headerTitle: () => <HeaderBurgerNav onPress={() => openMenu(navigation)}/>
                }
            }
    }
}

const MemberStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColor: '#444',
        headerStyle:{backgroundColor: '#fefee3'}
    }
})

export default MemberStack;