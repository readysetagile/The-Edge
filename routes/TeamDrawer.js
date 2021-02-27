import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import {Dashboard, Members} from "../src/screens";


import MemberStack from './MemberStack';


const TeamDrawerNavigation = createDrawerNavigator({

    Dashboard:{
        screen: Dashboard,

    },
    Members:{
        screen: Members
    }

})

export default createAppContainer(TeamDrawerNavigation);