import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {DrillsList, AssignedDrills} from "../../src/screens";
import HeaderBurgerNav from '../../src/Components/HeaderBurgerNav';
import {openMenu} from "../../src/firebase/Util";
import {Ionicons} from "@expo/vector-icons";
import {View} from "react-native";

const screens = {
    Drills: {
        screen: DrillsList,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => (
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <HeaderBurgerNav title="Team Drills" onPress={() => openMenu(navigation)}/>
                    <Ionicons name={'barbell-outline'} size={25} color={'blue'} style={{alignSelf: 'center', right: 35}}
                              onPress={() => {
                                  console.log(1);
                                  navigation.push("AssignedDrills")
                              }}
                    />
                </View>
                )
            }
        }
    },

    AssignedDrills: {
        screen: AssignedDrills,
        navigationOptions: {
            headerTitle: "Assigned Drills"
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