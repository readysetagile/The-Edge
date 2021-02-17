import {StyleSheet} from "react-native";
import Colors from '../styles';
export default StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: Colors.background
    },
    buttonStyle: {
        flex: 1,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    coachingColor: {
        backgroundColor: 'purple'
    },
    drillsColor: {
        backgroundColor: 'blue'
    },
    graphsColor: {
        backgroundColor: 'green'
    },
    challengesColor: {
        backgroundColor: 'gold'
    },
    scheduleColor: {
        backgroundColor: 'pink'
    },
    workoutsColor: {
        backgroundColor: 'violet'
    },
    imageStyle: {
        height: 100, 
        width: 100
    },
    titleText: {
        fontWeight: 700,
        marginTop: 5,
        color: 'black',
        fontSize: 25
    },
    buttonsText: {
        fontWeight: 700,
        marginTop: 10,
        color: 'white',
        fontSize: 20
    },
});
