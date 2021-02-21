import React from 'react';
import {Formik} from 'formik';
import {Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from "./styles";
import * as yup from 'yup';

const CreateAccountSchema = yup.object({

    Username: yup.string().required().min(3),
    Email: yup.string().required().min(1)
        .test('isValidEmail', "Invalid Email", val => {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(val);
        }),
    Password: yup.string().required().min(6),
    "Verified Password": yup.string().required().oneOf([yup.ref('Password'), null], "Passwords don't match"),
    rememberMe: yup.boolean().required()

})

export default function CreateAccountForm({createAccount}) {

    return (

        <View>

            <Formik initialValues={{Username: '', Email: '', Password: '', "Verified Password": '', rememberMe: false}}
                    validationSchema={CreateAccountSchema}
                    onSubmit={(values, actions) => {
                        console.log(1)
                        actions.resetForm();
                        createAccount(values);
                    }}>

                {(props) => (

                    <View style={{justifyContent: 'center'}}>

                        <View style={styles.contentContainer}>

                            <Text style={styles.inputDescription}>Display Name</Text>
                                <TextInput style={styles.inputView}
                                           placeholder="Username"
                                           placeholderTextColor="white"
                                           onBlur={props.handleBlur("Username")}
                                           onChangeText={props.handleChange('Username')}/>
                            <Text style={styles.errorMsg}>{props.touched.Username && props.errors.Username}</Text>

                            <Text style={styles.inputDescription}>Email</Text>
                                <TextInput style={styles.inputView}
                                           placeholder="example@email.com"
                                           placeholderTextColor="white"
                                           onBlur={props.handleBlur("Email")}
                                           onChangeText={props.handleChange('Email')}/>
                            <Text style={styles.errorMsg}>{props.touched.Email && props.errors.Email}</Text>

                            <Text style={styles.inputDescription}>Password</Text>
                                <TextInput style={styles.inputView}
                                           placeholder="Password"
                                           secureTextEntry
                                           placeholderTextColor="white"
                                           onBlur={props.handleBlur("Password")}
                                           onChangeText={props.handleChange('Password')}/>
                            <Text style={styles.errorMsg}>{props.touched.Password && props.errors.Password}</Text>

                            <Text style={styles.inputDescription}>Verify Password</Text>
                                <TextInput style={styles.inputView}
                                           placeholder="Repeat Password"
                                           secureTextEntry
                                           onChangeText={props.handleChange('Verified Password')}
                                           onBlur={props.handleBlur("Verified Password")}
                                           placeholderTextColor="white"/>
                            <Text style={styles.errorMsg}>{props.touched["Verified Password"]
                            && props.errors["Verified Password"]}</Text>

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
                                thumbColor={props.values.rememberMe ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={value => props.setFieldValue('rememberMe', value)}
                                value={props.values.rememberMe}
                                style={{
                                    alignSelf: 'center'
                                }}
                            />

                        </View>
                        <TouchableOpacity onPress={props.handleSubmit} style={styles.createAccountButton}>
                            <Text style={styles.createAccountText}>Create Account</Text>
                        </TouchableOpacity>


                    </View>

                )}

            </Formik>

        </View>
    );

}