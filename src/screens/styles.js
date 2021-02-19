import {StyleSheet} from "react-native-web";

const colors = {
    background: "#cc93c0",
    titleText: "#eff0d1",
    inputBox: "#ed7b84",
    mainButton: "#77ba99"
}

export default colors

const GlobalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    inputView: {
        width: "80%",
        backgroundColor: colors.inputBox,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    }

})

export {GlobalStyles};