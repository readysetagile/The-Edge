import React, {useState} from 'react';
import {Formik} from 'formik';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import FlatButton from "../../../Components/SubmitButton";
import * as yup from "yup";

export default function NewEventForm({onSubmit, event}) {

    const currDate = new Date();
    const [startDate, setStartDate] = useState(currDate);
    const [startTime, setStartTime] = useState(currDate);
    const [endDate, setEndDate] = useState(currDate);
    const [endTime, setEndTime] = useState(currDate);

    const EventSchema = yup.object({

        title: yup.string().required().min(1),
        location: yup.string(),
        summary: yup.string(),
        "start date": yup.date(),
        "start time": yup.date(),
        "end date": yup.date(),
        "end time": yup.date()

    })

    const startingTime = new Date(event?.startTime || currDate);
    const endingTime = new Date(event?.endTime || currDate);
    console.log(event, 1)
    return (
        <View style={globalStyles.modalView()}>
            <Formik
                initialValues={{
                    title: event?.title || '',
                    location: event?.body?.location || '',
                    summary: event?.body?.summary || '',
                    "start date": startingTime,
                    "start time": startingTime,
                    "end date": endingTime,
                    "end time": endingTime
                }}
                validationSchema={EventSchema}
                onSubmit={(values, actions) => {
                     actions.resetForm();
                     onSubmit(values);
                }}>

                {(props) => (
                    <View style={{alignItems: 'center', padding: 10, flex: 1}}>

                        <Text style={{color: colors.titleText, fontSize: 30, fontWeight: 'bold', padding: 20}}>
                            {event ? "Editing Event" : "New Event"}
                        </Text>

                        <TextInput
                            style={[globalStyles.inputView, {marginBottom: 0}]}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Title'
                            value={props.values.title}
                            onChangeText={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}
                        />

                        <Text style={globalStyles.errorText}>{props.errors["title"]}</Text>

                        <TextInput
                            style={[globalStyles.inputView]}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Location'
                            value={props.values.location}
                            onChangeText={props.handleChange('location')}
                            onBlur={props.handleBlur('location')}
                        />
                        <TextInput
                            style={{...globalStyles.inputView, borderRadius: 5, height: 90,
                                borderWidth: 2, borderColor: colors.titleText, fontSize: 20}}
                            multiline={true}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Summary'
                            value={props.values.summary}
                            onChangeText={props.handleChange('summary')}
                            onBlur={props.handleBlur('summary')}
                        />

                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>Start Date:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 80}}
                                    testID="dateTimePicker"
                                    value={props.values['start date']}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => {
                                        setStartDate(time);
                                        props.setFieldValue("start date", time)
                                    }}
                                />
                            </View>
                        </View>


                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>Start Time:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 90}}
                                    testID="dateTimePicker"
                                    value={props.values['start time']}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => {
                                        setStartTime(time);
                                        props.setFieldValue("start time", time)
                                    }}
                                />
                            </View>
                        </View>


                        <View style={{...styles.inputBox, marginTop: 5}}>
                            <Text style={styles.inputFontSize}>End Date:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 80}}
                                    testID="dateTimePicker"
                                    value={props.values['end date']}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => {
                                        setEndDate(time);
                                        props.setFieldValue("end date", time)
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>End Time:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 90}}
                                    testID="dateTimePicker"
                                    value={props.values['end time']}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(component, time) => {
                                        setEndTime(time);
                                        props.setFieldValue("end time", time)
                                    }}
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