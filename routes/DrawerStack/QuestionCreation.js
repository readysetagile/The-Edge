import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {QuestionCreationPage, ViewQuestions} from "../../src/screens";
import HeaderBurgerNav from "../../src/Components/HeaderBurgerNav";
import {openMenu} from "../../src/firebase/Util";
import {View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const screens = {
    Questions: {
        screen: QuestionCreationPage,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => (
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <HeaderBurgerNav title="Questions" onPress={() => openMenu(navigation)}/>
                        <Ionicons name={'eye-outline'} size={25} color={'blue'} style={{alignSelf: 'center', right: 35}}
                        onPress={() => {
                            navigation.navigate("ViewQuestions", {data: navigation.getParam("questionInfo")})
                        }}/>
                    </View>
                )
            }
        }
    },
    ViewQuestions:{
        screen: ViewQuestions,
    }
}

const QuestionStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#fefee3'}
    }
})

export default QuestionStack;