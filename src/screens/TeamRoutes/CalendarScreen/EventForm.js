import React from 'react';
import {Formik} from 'formik';
import {View, Text} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";

export default function NewEventForm({onSubmit}) {

    return (
        <View style={globalStyles.modalView()}>

            <Formik
                initialValues={{"team name": '', sport: ''}}
                //validationSchema={TeamSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    onSubmit(values);
                }}>

                {(props) => (
                    <View style={{alignItems: 'center', padding: 10, flex: 1}}>

                        <Text style={{color: colors.titleText, fontSize: 30, fontWeight: 'bold'}}>New Event</Text>

                    </View>
                )}
            </Formik>
        </View>
    );

}