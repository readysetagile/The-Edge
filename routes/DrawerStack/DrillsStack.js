import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {DrillsList} from "../../src/screens";
import HeaderBurgerNav from '../../src/Components/HeaderBurgerNav';
import {openMenu} from "../../src/firebase/Util";

const screens = {
    Drills: {
        screen: DrillsList,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <HeaderBurgerNav title={"Team Drills"} onPress={() => openMenu(navigation)}/>
            }
        }
    }
}

const DashboardStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default DashboardStack;