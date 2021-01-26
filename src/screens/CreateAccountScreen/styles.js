import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#f92a82"
    },
    contentContainer:{
        backgroundColor: "#2adaf9",
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
    inputDescription:{
        fontSize: 42,
        marginTop: 20,
        color: "#f92a89",
        fontWeight: 'bold'
    },
    createAccountButton: {
        width: "80%",
        backgroundColor: "#7eb77f",
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

/*
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
 */