import {StyleSheet} from 'react-native';
import Colors from '../../styles'

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        padding: 20
    },
    text: {
        fontSize: 20,
        alignSelf: 'center'
    },

    teamBannersView: {
        width: '95%',
        alignSelf: 'center',
        height: '100%',
        flex: 1
    },
    teamBanner: {
        backgroundColor: 'gold',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    teamName: {
        fontSize: 30,
        alignSelf: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 30,
        top: 5,
        alignSelf: 'center'
    },
    closeCreateTeam: {
        left: 20,
        top: 40,
        zIndex: 3
    },
    modalContent: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    inputView: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginTop: 10
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    }
});