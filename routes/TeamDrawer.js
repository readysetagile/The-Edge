import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer, NavigationActions, StackActions} from 'react-navigation';
import MemberStack from './DrawerStack/MemberStack';
import DashboardStack from "./DrawerStack/DashboardStack";
import QuestionStack from './DrawerStack/QuestionCreation'
import React from "react";
import colors from "../src/screens/styles";
import GlobalData from '../src/GlobalData'
import {Button, SafeAreaView, ScrollView} from "react-native";
import Edge from "../src/firebase";
import {firebase} from '../src/firebase/config'
import {Profile} from "../src/firebase/modules/profiles";
import {Members, QuestionCreationPage} from "../src/screens";
import HeaderBurgerNav from "../src/Components/HeaderBurgerNav";
import {openMenu} from "../src/firebase/Util";
import QuestionTabs from "./QuestionTabs";


const navigateToHome = ({navigation}) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
    });

    navigation.dispatch(resetAction);
    Edge.users.get(firebase.auth().currentUser.uid).then(account => {
        let prof = account.getProfile(GlobalData.profileID);
        navigation.navigate("HomeScreen", {profile: new Profile(prof)})
    })
}

const DrawerConfig = {
    intialRouteName: 'Home',
    contentComponent: (props) => (
        <SafeAreaView style={{flex: 1, borderWidth: 5}}>
            <ScrollView>
                <DrawerItems {...props}/>
                <Button title={"To Teams"} color={"#e91e63"} onPress={() => navigateToHome(props)}/>
            </ScrollView>
        </SafeAreaView>
    ),
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
    drawerBackgroundColor: colors.titleText,
};

const TeamDrawerNavigation = createDrawerNavigator({

    Dashboard: {
        screen: DashboardStack,
    },
    Members: {
        screen: MemberStack
    },
    Questions:{
        screen: QuestionTabs
    }

}, DrawerConfig)

export default createAppContainer(TeamDrawerNavigation);
