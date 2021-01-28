import {StyleSheet} from 'react-native';
import Colors from '../styles';
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    contentContainer:{
        backgroundColor: "#2780b3",
        height: '70%',
        width: '80%',
        marginTop: 20,
        shadowColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    text: {
        fontSize: 42,
        marginTop: 20,
        color: Colors.titleText,
        fontWeight: 'bold'
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
    inputDescription:{
        fontSize: 42,
        marginTop: 20,
        color: Colors.background,
        fontWeight: 'bold'
    },
    createAccountButton: {
        width: "80%",
        backgroundColor: Colors.mainButton,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    createAccountText: {
        color: "black",
        fontSize: 20
    }

});
