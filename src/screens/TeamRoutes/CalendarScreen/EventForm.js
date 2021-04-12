import React from 'react';
import {Formik} from 'formik';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function NewEventForm({onSubmit}) {

    return (
        <View style={globalStyles.modalView()}>

            <Formik
                initialValues={{"title": '', "location": ''}}
                //validationSchema={TeamSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    onSubmit(values);
                }}>

                {(props) => (
                    <View style={{alignItems: 'center', padding: 10, flex: 1}}>

                        <Text style={{color: colors.titleText, fontSize: 30, fontWeight: 'bold', padding: 20}}>New Event</Text>

                        <TextInput
                            style={globalStyles.inputView}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Title'
                            onChangeText={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}
                        />
                        <TextInput
                            style={globalStyles.inputView}
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
                            onChangeText={props.handleChange('location')}
                            onBlur={props.handleBlur('location')}
                        />

                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>Start Date:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 80}}
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={console.log}
                                />
                            </View>
                        </View>


                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>Start Time:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 90}}
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={console.log}
                                />
                            </View>
                        </View>


                        <View style={{...styles.inputBox, marginTop: 5}}>
                            <Text style={styles.inputFontSize}>End Date:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 80}}
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={console.log}
                                />
                            </View>
                        </View>

                        <View style={styles.inputBox}>
                            <Text style={styles.inputFontSize}>End Time:</Text>
                            <View>
                                <DateTimePicker
                                    style={{width: 90}}
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={console.log}
                                />
                            </View>
                        </View>


                    </View>
                )}
            </Formik>
        </View>
    );

}