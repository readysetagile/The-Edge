import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {DrillsList, AssignedDrills} from "../../src/screens";
import HeaderBurgerNav from '../../src/Components/HeaderBurgerNav';
import {openMenu} from "../../src/firebase/Util";
import {Ionicons} from "@expo/vector-icons";
import {View, Text} from "react-native";
import {firebase} from "../../src/firebase/config";
import GlobalData from "../../src/GlobalData";
import {globalStyles} from "../../src/screens/GlobalStyles";

let numAssigned = 0;

firebase.database().ref("teams/"+GlobalData.teamID+"/members/"+GlobalData.profileID+"/assignedDrills").on('value', snap => {
    if(snap?.val() != null){

        numAssigned = Object.keys(snap.val()).length-1;

    }
})

const screens = {
    Drills: {
        screen: DrillsList,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => (

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <HeaderBurgerNav title="Team Drills" onPress={() => openMenu(navigation)}/>
                    <View style={{alignSelf: 'center', right: 35, flexDirection: 'row'}}>

                        <Ionicons name={'barbell-outline'} size={25} color={'blue'} style={{zIndex: 2}}
                                  onPress={() => {
                                      navigation.navigate("AssignedDrills")
                                  }}
                        />
                        {numAssigned ?
                            <Text style={
                                {
                                    ...globalStyles.notification(false, 10),
                                    alignSelf: 'center',
                                    top: 8
                                }}>
                                {numAssigned}</Text>
                            : null}

                    </View>

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