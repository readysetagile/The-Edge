import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
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