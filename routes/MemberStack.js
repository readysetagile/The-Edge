import { createStackNavigator } from 'react-navigation-stack';
import {Members} from "../src/screens";

const screens = {
    Members: {
        screen: Members,
        navigationOptions:{
            title: "Member List"
        }
    }
}

const MemberStack = createStackNavigator(screens, {
    defaultNavigationOptions:{
        headerTintColor: '#444',
        headerStyle:{backgroundColor: '#fefee3'}
    }
})

export default MemberStack;