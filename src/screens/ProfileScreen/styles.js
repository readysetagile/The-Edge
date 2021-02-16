import {StyleSheet} from 'react-native';
import Colors from '../styles';

export default StyleSheet.create({

    background:{
        backgroundColor: Colors.background
    },
    profileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderRadius: 25,
    },
    item:{
        width: '50%',
        padding: 20,
    },
    profilePicture:{
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    text:{
        fontSize: 20,
        alignSelf: 'center',
    }
});