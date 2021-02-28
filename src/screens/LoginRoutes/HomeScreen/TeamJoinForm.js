import React from 'react';
import {Formik} from 'formik';
import {Text, TextInput, View} from 'react-native';
import * as yup from 'yup';
import FlatButton from "../../../Components/SubmitButton";
import {globalStyles} from "../../GlobalStyles";
import Edge from "../../../firebase";


export default function TeamCreateForm({onSubmit}) {

    const TeamSchema = yup.object({
        "team code": yup.string().required().min(5)
            .test('testValidCode', "Invalid Code or the team is not accepting new members", async value => {
                const teams = await Edge.teams.getAllTeams();
                if(teams != null) {
                    for (let [K, V] of teams) {
                        if (V.inviteData?.acceptNewMembers && V.inviteData?.teamCode === value) {
                            return true;
                        }
                    }
                }
                return false;
            }),
    })

    return (
        <View style={globalStyles.modalView()}>

            <Formik
                initialValues={{"team code": ''}}
                validationSchema={TeamSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    onSubmit(values);
                }}>

                {(props) => (

                    <View>
                        <Text style={{...globalStyles.title, marginBottom: 10, fontSize: 50}}>Join Team</Text>
                        <TextInput
                            style={globalStyles.inputView}
                            placeholderTextColor={'#003f5c'}
                            placeholder='Team Code'
                            onChangeText={props.handleChange('team code')}
                            onBlur={props.handleBlur('team code')}
                        />
                        <Text
                            style={globalStyles.errorText}>{props.touched["team code"] && props.errors["team code"]}</Text>


                        <FlatButton text="Join!" onPress={props.handleSubmit}/>

                    </View>

                )}

            </Formik>

        </View>
    )

}