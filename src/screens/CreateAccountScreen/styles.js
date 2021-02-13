import {StyleSheet} from 'react-native';
import Colors from '../styles';

import { Dimensions } from 'react-native';

const { width, fontScale } = Dimensions.get("window");
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;



//export {scale, verticalScale, moderateScale};

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
        justifyContent: 'space-evenly',
        borderRadius: 30,
        flex: 4
    },
    text: {
        fontSize: moderateScale(42),
        marginTop: 20,
        color: Colors.titleText,
        fontWeight: 'bold'
    },
    errorMsg:{
        color:"red",
        height: 14,
        bottom: 5,
        textAlign: 'center',
    },
    hiddenViewErr:{
        width: '80%',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 5
    },

    inputView: {
        width: '80%',
        backgroundColor: Colors.inputBox,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 20,
        flex: .25
    },
    prompt:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    inputDescription:{
        fontSize: 35,
        color: Colors.background,
        fontWeight: 'bold',
    },
    inputText: {
        height: 15,
        color: "white"
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
