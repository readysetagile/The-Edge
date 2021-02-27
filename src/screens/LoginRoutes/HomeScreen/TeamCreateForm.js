import React from 'react';
import {Formik} from 'formik';
import {Text, TextInput, View} from 'react-native';
import styles from "./styles";
import * as yup from 'yup';
import FlatButton from "../../../Components/SubmitButton";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";

const TeamSchema = yup.object({

    "team name": yup.string().required().min(1),
    sport: yup.string().required().min(1),
    /* For reference on how to use the test method
    rating: yup.string().required()
        .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0
        })

     */

})

export default function TeamCreateForm({addTeam}) {

    return (
        <View style={{flex: 1, padding: 20, top: 30, backgroundColor: colors.background}}>

            <Formik
                initialValues={{"team name": '', sport: ''}}
                validationSchema={TeamSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addTeam(values);
                }}>

                {(props) => (

                    <View style={{}}>
                        <Text style={{...globalStyles.title, marginBottom: 10, fontSize: 50}}>Team Info</Text>
                        <TextInput
                            style={globalStyles.inputView}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Team Name'
                            onChangeText={props.handleChange('team name')}
                            value={props.values.title}
                            onBlur={props.handleBlur('team name')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched["team name"] && props.errors["team name"]}</Text>

                        <TextInput
                            style={globalStyles.inputView}
                            placeholder='Sport/Activity'
                            placeholderTextColor={'#003f5c'}
                            onChangeText={props.handleChange('sport')}
                            value={props.values.body}
                            onBlur={props.handleBlur('sport')}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.sport && props.errors.sport}</Text>

                        <FlatButton text="Submit" onPress={props.handleSubmit}/>

                    </View>

                )}

            </Formik>

        </View>
    )

}