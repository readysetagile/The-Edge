import React, {Component} from 'react';
import {Alert, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import HiddenView from "../../Components/HiddenView";
import {UserAuthentication} from "../../firebase/UserAuthentication";
import Edge from "../../firebase";
import {NavigationActions, StackActions} from "react-navigation";

export default class CreateAccountScreen extends Component {

    state = {
        username: {
            hide: true,
            msg: ""
        },
        email: {
            hide: true,
            msg: ""
        },
        password: {
            hide: true,
            msg: ""
        },
        confirmPassword: {
            hide: true,
            msg: ""
        },
        rememberMe: false
    };

    accInfo = {};

    constructor(props) {
        super(props);
        this.accInfo = {
            email: "",
            username: "",
            password: "",
            verifiedPass: ""
        };
    }

    /**
     * Creates an account for the user if they have valid credentials
     * @todo map each error message to a friendlier message
     * @returns {Promise<void>}
     */
    onCreateAccount = async () => {
        const {navigation} = this.props;
        const validEmail = this.checkEmail(this.accInfo.email.trim());
        const validUsername = await this.checkUsername(this.accInfo.username.trim());
        const passMatch = this.checkPass(this.accInfo.password, this.accInfo.verifiedPass);

        this.updateStates(validEmail, validUsername, passMatch);

        if (validEmail && validUsername && passMatch) {

            const msg = await UserAuthentication.createAccount(this.accInfo.email, this.accInfo.password, this.accInfo.username);

            if (msg.confirmed) {
                let uuid = msg.credentials.user.uid;
                await Edge.users.create(this.accInfo.email, this.state.rememberMe, uuid);
                this.sendToProfilePage()
                navigation.dispatch(resetAction);
            } else {
                Alert.alert(
                    "Invalid Credentials",
                    msg.message,
                );
            }

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

    /**
     * Updates the login forum boxes of the page. This will display to the user
     * if a filled out box was invalid or not
     * @param email boolean of if the email is valid
     * @param username boolean of if the username is valid
     * @param password boolean of if the password is valid
     */
    updateStates(email, username, password) {
        this.setState({
            email: {
                hide: email,
                msg: "X Invalid Email"
            }
        });

        this.setState({
            username: {
                hide: username,
                msg: "X Username already in use"
            }
        });

        this.setState({
            confirmPassword: {
                hide: password,
                msg: "X Passwords do not match"
            }
        });
    }

    /**
     * Verifies an email address based on a regex match
     * @param email the email to verify
     * @returns {boolean} if the email passed the verification
     */
    checkEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * Any username is valid as long as it is not already existing in the database
     * @param name the name to verify
     * @returns {Promise<boolean>} if the username was valid or not
     */
    async checkUsername(name) {
        return await UserAuthentication.isUnknownUsername(name.trim()) && name !== "";
    }

    /**
     * Compares the two passwords (confirmation password and initial password) to see if they are equal
     * and compares them to empty strings
     * @param password the password to verify
     * @param confirmPass the retyped password to verify
     * @returns {boolean} if the verification passed
     */
    checkPass(password, confirmPass) {
        return password === confirmPass && password !== "" && confirmPass !== "";
    }

    onRememberMe = () => {
        this.setState({rememberMe: !this.state.rememberMe});
    };

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.text}>Create Account</Text>

                <View style={styles.contentContainer}>

                    <View style={styles.prompt}>
                        <Text style={styles.inputDescription}>Display Name</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                       placeholder="Username"
                                       placeholderTextColor="white"
                                       onChangeText={text => this.accInfo.username = text}>{this.accInfo.username}</TextInput>

                        </View>
                        <HiddenView hide={this.state.username.hide} style={styles.hiddenViewErr}>
                            <Text style={styles.errorMsg}>{this.state.username.msg}</Text>
                        </HiddenView>
                    </View>

                    <View style={styles.prompt}>
                        <Text style={styles.inputDescription}>Email</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                       placeholder="example@email.com"
                                       placeholderTextColor="white"
                                       onChangeText={text => this.accInfo.email = text}>{this.accInfo.email}</TextInput>
                        </View>
                        <HiddenView hide={this.state.email.hide} style={styles.hiddenViewErr}>
                            <Text style={styles.errorMsg}>{this.state.email.msg}</Text>
                        </HiddenView>
                    </View>

                    <View style={styles.prompt}>
                        <Text style={styles.inputDescription}>Password</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                       placeholder="Password"
                                       secureTextEntry
                                       placeholderTextColor="white"
                                       onChangeText={text => this.accInfo.password = text}>{this.accInfo.password}</TextInput>
                        </View>
                        <HiddenView hide={this.state.password.hide} style={styles.hiddenViewErr}>
                            <Text style={styles.errorMsg}>{this.state.password.msg}</Text>
                        </HiddenView>
                    </View>

                    <View style={styles.prompt}>
                        <Text style={styles.inputDescription}>Verify Password</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                       placeholder="Repeat Password"
                                       secureTextEntry
                                       onChangeText={text => this.accInfo.verifiedPass = text}
                                       placeholderTextColor="white">{this.accInfo.verifiedPass}</TextInput>
                        </View>
                        <HiddenView hide={this.state.confirmPassword.hide} style={styles.hiddenViewErr}>
                            <Text style={styles.errorMsg}>{this.state.confirmPassword.msg}</Text>
                        </HiddenView>
                    </View>
                </View>

                <View style={styles.rememberMeView}>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        padding: 5,
                        alignSelf: 'center',
                        textAlign: 'right'
                    }}>Remember Me?</Text>
                    <Switch
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={this.state.rememberMe ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.onRememberMe}
                        value={this.state.rememberMe}
                        style={{
                            alignSelf: 'center'
                        }}
                    />
                </View>

                <TouchableOpacity onPress={this.onCreateAccount} style={styles.createAccountButton}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>

            </View>
        );
    }

}
