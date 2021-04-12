import {StyleSheet} from "react-native";
import Colors from '../../styles';
import colors from "../../styles";

export default StyleSheet.create({

    inputBox: {
        width: '100%',
        borderWidth: 2,
        borderColor: colors.inputBox,
        borderRadius: 5,
        backgroundColor: colors.titleText,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputFontSize: {
        fontSize: 20,
        marginLeft: 20
    }

});