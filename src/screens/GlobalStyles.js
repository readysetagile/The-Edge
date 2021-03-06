import colors from "./styles";
import Colors from "./styles";

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
    title: {
        marginBottom: 50,
        color: colors.titleText,
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
    },
    avatar: function (size = 100) {
        return {
            borderRadius: size / 2,
            width: size,
            height: size
        }
    },
    newButton: {
        backgroundColor: Colors.mainButton,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 200,
        bottom: 50,
        right: 50,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        shadowColor: 'black',
        shadowOffset: {
            width: -3,
            height: 5
        },
        shadowOpacity: 0.6
    },
    shadow: function (width, height, color = 'black') {
        return {
            shadowColor: color,
            shadowOffset: {
                width: width,
                height: height
            }
        }
    },
    modalContent: {
        flex: 1
    },
    closeModal: function (zIndex = 3) {
        return {
            left: 20,
            top: 40,
            zIndex: zIndex
        }
    },
    modalView: function (color = colors.background) {
        return {
            flex: 1,
            padding: 20,
            top: 30,
            backgroundColor: color
        }

    },

    topToolBar: {
        backgroundColor: colors.inputBox,
        marginBottom: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderBottomWidth: 2,
        borderColor: 'black'
    },
    searchToolBar: {
        width: '30%',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'gray',
        padding: 5
    },
    notification: function(absolute=true, size=20){
        return {
            backgroundColor: 'red',
            color: 'white',
            fontSize: size,
            alignSelf: 'center',
            padding: 2,
            fontWeight: 'bold',
            position: absolute ? 'absolute' : 'relative',
            right: 7,
            bottom: 7
        }
    }


}
