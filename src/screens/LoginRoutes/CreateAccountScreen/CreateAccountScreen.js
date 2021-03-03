import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './styles';
import {UserAuthentication} from "../../../firebase/UserAuthentication";
import Edge from "../../../firebase";
import {NavigationActions, StackActions} from "react-navigation";
import CreateAccountForm from './CreateAccountForm';

export default class CreateAccountScreen extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Creates an account for the user if they have valid credentials
     * @todo map each error message to a friendlier message
     * @returns {Promise<void>}
     */
    onCreateAccount = async (values) => {

        const msg = await UserAuthentication.createAccount(values.Email, values.Password, values.Username);

        if (msg.confirmed) {
            let uuid = msg.credentials.user.uid;
            await Edge.users.create(values.Email, values.rememberMe, uuid);
            this.sendToProfilePage();
        } else {
            Alert.alert(
                "Invalid Credentials",
                msg.message,
            );
        }


    };

    sendToProfilePage() {
        const {navigation} = this.props;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Profiles'})],
        });
        navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Create Account</Text>

                <View style={{width: '80%'}}>
                    <CreateAccountForm createAccount={(values) => this.onCreateAccount(values)}/>
                </View>

            </View>
        );
    }

}
