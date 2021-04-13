import React, {useState} from 'react';
import {Formik} from 'formik';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import FlatButton from "../../../Components/SubmitButton";
import * as yup from "yup";

export default function NewEventForm({onSubmit}) {

    const currDate = new Date();

    const EventSchema = yup.object({

        title: yup.string().required().min(1),
        location: yup.string(),
        summary: yup.string(),
        "start date": yup.date(),
        "start time": yup.date(),
        "end date": yup.date(),
        "end time": yup.date()

    })

    return (
        <View style={globalStyles.modalView()}>

            <Formik
                initialValues={{
                    title: '',
                    location: '',
                    summary: '',
                    "start date": currDate,
                    "start time": currDate,
                    "end date": currDate,
                    "end time": currDate
                }}
                validationSchema={EventSchema}
                onSubmit={(values, actions) => {
                     actions.resetForm();
                     onSubmit(values);
                }}>

                {(props) => (
                    <View style={{alignItems: 'center', padding: 10, flex: 1}}>

                        <Text style={{color: colors.titleText, fontSize: 30, fontWeight: 'bold', padding: 20}}>New Event</Text>

                        <TextInput
                            style={[globalStyles.inputView, {marginBottom: 0}]}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Title'
                            onChangeText={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}
                        />

                        <Text style={globalStyles.errorText}>{props.errors["title"]}</Text>

                        <TextInput
                            style={[globalStyles.inputView]}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Location'
                            onChangeText={props.handleChange('location')}
                            onBlur={props.handleBlur('location')}
                        />
                        <TextInput
                            style={{...globalStyles.inputView, borderRadius: 5, height: 90,
                                borderWidth: 2, borderColor: colors.titleText, fontSize: 20}}
                            multiline={true}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Summary'
                            onChangeText={props.handleChange('summary')}
                            onBlur={props.handleBlur('summary')}
                        />

                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>Start Date:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 80}}
                                    testID="dateTimePicker"
                                    value={currDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => props.setFieldValue("start date", time)}
                                />
                            </View>
                        </View>


                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>Start Time:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 90}}
                                    testID="dateTimePicker"
                                    value={currDate}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => props.setFieldValue("start time", time)}
                                />
                            </View>
                        </View>


                        <View style={{...styles.inputBox, marginTop: 5}}>
                            <Text style={styles.inputFontSize}>End Date:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 80}}
                                    testID="dateTimePicker"
                                    value={currDate}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => props.setFieldValue("end date", time)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>End Time:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 90}}
                                    testID="dateTimePicker"
                                    value={currDate}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => props.setFieldValue("end time", time)}
                                />
                            </View>
                        </View>

                        <FlatButton text={"Done"} style={{padding: 20, width: '100%'}} onPress={props.handleSubmit}/>


                    </View>
                )}
            </Formik>
        </View>
    );

}