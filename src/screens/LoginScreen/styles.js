import {StyleSheet} from "react-native";
import Colors from '../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: Colors.titleText,
        marginBottom: 40
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
    forgot: {
        color: "white",
        fontSize: 15
    },
    loginButton: {
        width: "80%",
        backgroundColor: Colors.mainButton,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    },
    hiddenViewErr: {
        width: '80%',
        justifyContent: 'space-around',
        marginTop: -12
    },
    errorMsg: {
        color: "yellow",
        height: 14,
        bottom: 5,
        textAlign: 'center',
    },

    rememberMeView: {
        flexDirection: 'row',
        height: 50,
    }

});
