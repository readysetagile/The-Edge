import React from 'react'
import {Text} from 'react-native'
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import HeaderBurgerNav from '../../src/Components/HeaderBurgerNav';
import {openMenu} from "../../src/firebase/Util";
import DayScreen from "../../src/screens/TeamRoutes/CalendarScreen/DayScreen";
import {MonthScreen, YearScreen} from "../../src/screens";
import {Ionicons} from "@expo/vector-icons";

const screens = {
    
    YearScreen: {
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
                headerTitle: () => <HeaderBurgerNav leftSide={false} title={"Calendar - Month"} onPress={() => openMenu(navigation)}/>,
                headerLeft: () => {
                    return <HeaderBackButton onPress={() => navigation.navigate("YearScreen")} label={navigation.getParam("yearNum")}/>
                },
                headerRight: () => {
                    return (
                        <Ionicons name={'add'} size={25}
                                  onPress={() => {
                                      navigation.setParams({
                                          modalOpen: true
                                      })
                                  }}
                                  color={'blue'} style={{
                            right: 20,
                        }}/>
                    )
                }
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
}

const CalendarStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default CalendarStack;