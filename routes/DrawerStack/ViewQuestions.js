import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen, QuestionCreationPage} from "../../src/screens";
import HeaderBurgerNav from "../../src/Components/HeaderBurgerNav";
import {openMenu} from "../../src/firebase/Util";

const screens = {
    ViewQuestions: {
        screen: QuestionCreationPage,
        // navigationOptions: ({navigation}) => {
        //     return {
        //         headerTitle: () => <HeaderBurgerNav title="View Questions" onPress={() => openMenu(navigation)}/>
        //     }
        // }
    }
}

const QuestionStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default QuestionStack;