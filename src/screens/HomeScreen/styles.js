import {StyleSheet} from 'react-native';
import Colors from '../styles'
export default StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        height: '100%',
        justifyContent: 'flex-start',
        flex: 1
    },
    text: {
        fontSize: 20,
        alignSelf: 'center'
    },

    teamBannersView:{
        width: '95%',
        alignSelf: 'center',
        height: '100%',
        flex: 1
    },
    teamBanner:{
        backgroundColor: 'gold',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    teamName:{
        fontSize: 30,
        alignSelf: 'center'
    },
    newTeamButton:{
        backgroundColor:Colors.mainButton,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 200,
        bottom: 50,
        right: 50,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        shadowColor: 'black',
        shadowOffset: {
            width: -3,
            height: 5
        },
        shadowOpacity: 0.6
    }

});