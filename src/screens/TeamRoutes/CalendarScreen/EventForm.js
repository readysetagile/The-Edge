import React from 'react';
import {Formik} from 'formik';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";

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
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <TextInput
                            style={globalStyles.inputView}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Location'
                            onChangeText={props.handleChange('location')}
                            value={props.values.title}
                            onBlur={props.handleBlur('location')}
                        />

                    </View>
                )}
            </Formik>
        </View>
    );

}