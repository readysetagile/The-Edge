import {StyleSheet} from 'react-native';
import Colors from '../styles';
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    contentContainer:{
        backgroundColor: "#2780f4",
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
    errorMsg:{
        color:"red",
        height:14,
        bottom: 5,
        textAlign: 'center',
    },
    hiddenViewErr:{
        width: '80%',
        justifyContent: 'space-around',
        marginTop: -12
    },

    inputView: {
        width: "80%",
        backgroundColor: Colors.inputBox,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'space-around',
        padding: 20
    },
    inputText: {
        height: 15,
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
        marginTop: 10,
        marginBottom: 10
    },
    createAccountText: {
        color: "white",
        fontSize: 20
    },
    rememberMeView:{
        marginTop: 10,
        flexDirection: 'row',
    }

});
