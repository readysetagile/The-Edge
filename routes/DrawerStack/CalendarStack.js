import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {CalendarScreen} from "../../src/screens";
import HeaderBurgerNav from '../../src/Components/HeaderBurgerNav';
import {openMenu} from "../../src/firebase/Util";
import YearScreen from "../../src/screens/TeamRoutes/CalendarScreen/YearScreen";
import MonthScreen from "../../src/screens/TeamRoutes/CalendarScreen/MonthScreen";
import DayScreen from "../../src/screens/TeamRoutes/CalendarScreen/DayScreen";

const screens = {
    
    Calendar: {
        screen: YearScreen,
            navigationOptions: ({navigation}) => {
                return {
                    headerTitle: () => <HeaderBurgerNav title={"Calendar - Year"} onPress={() => openMenu(navigation)}/>
                }
            }
        },
    MonthScreen: {
        screen: MonthScreen,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <HeaderBurgerNav title={"Calendar - Month"} onPress={() => openMenu(navigation)}/>
            }
        }
    },
    DayScreen:{
        screen: DayScreen,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <HeaderBurgerNav title={"Calendar - Day"} onPress={() => openMenu(navigation)}/>
            }
        }
    }
    
    // Calendar: {
    //     screen: CalendarScreen,
    //     navigationOptions: ({navigation}) => {
    //         return {
    //             headerTitle: () => <HeaderBurgerNav title={"Calendar"} onPress={() => openMenu(navigation)}/>
    //         }
    //     }
    // }
}

const CalendarStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default CalendarStack;