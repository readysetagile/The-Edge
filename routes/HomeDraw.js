import {createDrawerNavigator} from "react-navigation-drawer";
import {createAppContainer} from "react-navigation";
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';

const RootDrawerNavigator = createDrawerNavigator({

    HomeScreen:{
        screen: HomeStack,
    },
    Login:{
        screen: LoginStack,
    }

});

export default createAppContainer(RootDrawerNavigator);