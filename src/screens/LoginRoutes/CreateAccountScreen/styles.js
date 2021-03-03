import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../styles';

const {width, height} = Dimensions.get("window");
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background
    },
    contentContainer: {
        backgroundColor: "#2780f4",
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 30,
        height: '78%'
    },
    text: {
        fontSize: moderateScale(42),
        marginTop: 20,
        color: Colors.titleText,
        fontWeight: 'bold'
    },
    errorMsg: {
        color: "gold",
        textAlign: 'center',
    },
    hiddenViewErr: {
        width: '80%',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 5
    },
    inputView: {
        backgroundColor: Colors.inputBox,
        borderRadius: 25,
        justifyContent: "center",
        padding: 20,
        color: 'white',
        width: '80%',
    },
    inputDescription: {
        fontSize: 35,
        color: Colors.background,
        fontWeight: 'bold',
    },
    inputText: {
        color: "white",
    },
    createAccountButton: {
        width: "80%",
        backgroundColor: Colors.mainButton,
        borderRadius: 25,
        height: 50,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    createAccountText: {
        color: "white",
        fontSize: 20,
    },
    rememberMeView: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    }

});
