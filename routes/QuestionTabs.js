import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer, NavigationActions, StackActions} from 'react-navigation';
import React from "react";
import QuestionCreation from "./DrawerStack/QuestionCreation";
import ViewQuestions from "./DrawerStack/ViewQuestions";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";

// const QuestionTabNavigation = createDrawerNavigator({
//
//     MakeQuestions: {
//         screen: QuestionCreation,
//     },
//     ViewQuestions: {
//         screen: ViewQuestions
//     }
//
// })
const Tabs = createMaterialTopTabNavigator();

function QuestionTabNavigation(){
    return(
        <NavigationContainer>
            <Tabs.Navigator>
                <Tabs.Screen name={"Questions"} component={QuestionCreation}/>
                <Tabs.Screen name={"ViewQuestions"} component={ViewQuestions}/>
            </Tabs.Navigator>
        </NavigationContainer>
    )
}

export default QuestionTabNavigation;
