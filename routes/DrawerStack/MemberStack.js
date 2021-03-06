import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {Members, ViewQuestions} from "../../src/screens";
import HeaderBurgerNav from "../../src/Components/HeaderBurgerNav";
import {openMenu} from "../../src/firebase/Util";

const screens = {
    Members: {
        screen: Members,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <HeaderBurgerNav title="Member List" onPress={() => openMenu(navigation)}/>
            }
        }
    },
    SeeMemberQuestions: {
        screen: ViewQuestions,
        navigationOptions: {
            headerTitle: "View Questions"
        }
    }
}

const MemberStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default MemberStack;