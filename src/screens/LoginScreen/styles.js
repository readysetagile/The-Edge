import {StyleSheet} from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f92a82',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#d6d5b3",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ed7b84",
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
        backgroundColor: "#7eb77f",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});
