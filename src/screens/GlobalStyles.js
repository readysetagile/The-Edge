import {StyleSheet} from "react-native-web";
import colors from "./styles";

export const globalStyles = {

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
        width: "100%",
        backgroundColor: colors.inputBox,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    errorText: {
        color: 'gold',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    },
    title:{
        marginBottom: 50,
        color: colors.titleText,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
    }


}
