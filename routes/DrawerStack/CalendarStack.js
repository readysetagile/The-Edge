import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {CalendarScreen} from "../../src/screens";
import HeaderBurgerNav from '../../src/Components/HeaderBurgerNav';
import {openMenu} from "../../src/firebase/Util";

const screens = {
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <HeaderBurgerNav title={"Calendar"} onPress={() => openMenu(navigation)}/>
            }
        }
    }
}

const CalendarStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default CalendarStack;