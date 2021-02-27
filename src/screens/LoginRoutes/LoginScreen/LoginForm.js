import React from 'react';
import {Formik} from 'formik';
import {Button, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import * as yup from 'yup';
import {globalStyles} from "../../GlobalStyles";
const LoginSchema = yup.object({
    Email: yup.string().required()
        .min(1)
        .test('isValidEmail', "Invalid Email", val => {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(val);
        }),
    Password: yup.string().required().min(6),
    rememberMe: yup.boolean()
})

export default function LoginForm({login}) {

    return (

        <View>

            <Formik initialValues={{Email: '', Password: '', rememberMe: false}}
                    validationSchema={LoginSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        login(values);
                    }}>

                {(props) => (

                    <View>

                        <TextInput
                            style={globalStyles.inputView}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Email')}
                            onBlur={props.handleBlur('Email')}/>
                        <Text style={styles.errorText}>{props.touched.Email && props.errors.Email}</Text>

                        <TextInput
                            style={globalStyles.inputView}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry
                            onChangeText={props.handleChange('Password')}
                            onBlur={props.handleBlur('Password')}/>
                        <Text style={styles.errorText}>{props.touched.Password && props.errors.Password}</Text>


                        <View style={styles.rememberMeView}>
                            <Text style={{
                                fontSize: 20,
                                color: 'white',
                                padding: 10,
                                alignSelf: 'center',
                                textAlign: 'right'
                            }}>Remember Me?</Text>

                            <Switch
                                value={props.values.rememberMe}
                                trackColor={{false: "#767577", true: "#81b0ff"}}
                                thumbColor={props.values.rememberMe ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={value => props.setFieldValue('rememberMe', value)}
                                style={{alignSelf: 'center'}}
                            />
                        </View>

                        <Button title={"Forgot Password"} style={styles.forgot} color={"white"}/>

                        <TouchableOpacity style={styles.loginButton} onPress={props.handleSubmit}>
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>

                    </View>

                )}

            </Formik>

        </View>

    )


}