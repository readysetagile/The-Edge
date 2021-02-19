import React, {Component} from 'react';
import {Formik} from 'formik';
import {StyleSheet, Button, TextInput, View, Text} from 'react-native';
import styles from "./styles";
import Colors from '../styles'

export default function ReviewForm(){

        return(
            <View style={{flex: 1, padding: 20, top: 30}}>

                <Formik
                initialValues={{teamName: '', sport: ''}}
                onSubmit={(values) => {
                    console.log(values);
                }}>

                    {(props) => (

                        <View>
                            <Text style={styles.titleText}>Team Info</Text>
                                <TextInput
                                    style={styles.inputView}
                                    placeholder='Team Name'
                                    onChangeText={props.handleChange('teamName')}
                                    value={props.values.title}
                                />

                                <TextInput
                                    style={styles.inputView}
                                    placeholder='Sport/Activity'
                                    onChangeText={props.handleChange('sport')}
                                    value={props.values.body}
                                />

                            <Button color='maroon' title="Submit" onPress={props.handleSubmit} />

                        </View>

                    )}

                </Formik>

            </View>
        )

}