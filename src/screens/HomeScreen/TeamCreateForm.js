import React, {Component} from 'react';
import {Formik} from 'formik';
import {Button, TextInput, View, Text} from 'react-native';
import styles from "./styles";
import * as yup from 'yup';
import FlatButton from "../../Components/SubmitButton";

const TeamSchema = yup.object({

    teamName: yup.string().required().min(1),
    sport: yup.string().required().min(1),
    /* For reference on how to use the test method
    rating: yup.string().required()
        .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0
        })

     */

})

export default function TeamCreateForm({addTeam}){

        return(
            <View style={{flex: 1, padding: 20, top: 30}}>

                <Formik
                initialValues={{teamName: '', sport: ''}}
                validationSchema={TeamSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addTeam(values);
                }}>

                    {(props) => (

                        <View>
                            <Text style={styles.titleText}>Team Info</Text>
                                <TextInput
                                    style={styles.inputView}
                                    placeholder='Team Name'
                                    onChangeText={props.handleChange('teamName')}
                                    value={props.values.title}
                                    onBlur={props.handleBlur('teamName')}//realtime validation onBlur
                                />
                                <Text style={styles.errorText}>{props.touched.teamName && props.errors.teamName}</Text>

                                <TextInput
                                    style={styles.inputView}
                                    placeholder='Sport/Activity'
                                    onChangeText={props.handleChange('sport')}
                                    value={props.values.body}
                                    onBlur={props.handleBlur('sport')}
                                />
                            <Text style={styles.errorText}>{props.touched.sport && props.errors.sport}</Text>

                            <FlatButton text="Submit" onPress={props.handleSubmit}/>

                        </View>

                    )}

                </Formik>

            </View>
        )

}