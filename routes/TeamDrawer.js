import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {View, SafeAreaView, ScrollView} from 'react-native';
import MemberStack from './MemberStack';
import LoginStack from "./LoginStack";
import DashboardStack from "./DashboardStack";
import React, {Component} from "react";
import colors from "../src/screens/styles";

const DrawerConfig = {
    intialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'white',
        },
    },
    contentOptions: {
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
            marginVertical: 10,
        },
        iconContainerStyle: {
            opacity: 1,
        },
    },
    drawerBackgroundColor: colors.titleText, // sets background color of drawer
};

const TeamDrawerNavigation = createDrawerNavigator({

    Dashboard:{
        screen: DashboardStack,
    },
    Members:{
        screen: MemberStack
    },
    "To My Teams":{
        screen: LoginStack
    }

}, DrawerConfig)



export function openMenu(navigation){
    navigation.openDrawer();
}

export default createAppContainer(TeamDrawerNavigation);

class DrawerStyles extends Component{

    render(){

        console.log(this.props);
        return(

            <View style={{flex: 1, padding: 20}}>
                <ScrollView>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>

                        <DrawerItems {...this.props}/>

                    </SafeAreaView>
                </ScrollView>
            </View>

        )

    }

}