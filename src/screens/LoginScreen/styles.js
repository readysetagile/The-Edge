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
        backgroundColor: Colors.inputBox,
        borderRadius: 25,
        height: 50,
        marginBottom: 2,
        justifyContent: "center",
        padding: 20,
        color: 'white'
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
        marginBottom: 10,
        alignSelf: 'center'
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
        justifyContent: 'center'
    },
    errorText: {
        color: 'gold',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    }

});
