import Colors from '../styles';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    background: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.background,
    },
    avatar: {
        borderRadius: 100 / 2,
        width: 100,
        height: 100
    },
    contentView: {
        height: '70%'
    },
    inputView: {
        width: "80%",
        backgroundColor: Colors.inputBox,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    createProfileButton: {
        width: "80%",
        backgroundColor: Colors.mainButton,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },

});