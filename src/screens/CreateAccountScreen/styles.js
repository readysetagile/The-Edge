import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    scrollView: {
        backgroundColor: "#ed7b84",
    },
    view:{
        flex: 1,
        backgroundColor: '#f92a82',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 42,
        marginTop: 20,
        color: "#d6d5b3",
        fontWeight: 'bold'
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
    descriptionView:{
        flex:0,
        flexDirection:'column'
    },
    categoryText:{
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        padding: 10,
    }

});