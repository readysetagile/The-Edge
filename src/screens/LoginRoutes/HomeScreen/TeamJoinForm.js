import React, {useState} from 'react';
import {Formik} from 'formik';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import FlatButton from "../../../Components/SubmitButton";
import {globalStyles} from "../../GlobalStyles";
import Edge from "../../../firebase";
import HiddenView from "../../../Components/HiddenView";
import colors from "../../styles";


export default function TeamCreateForm({onSubmit}) {

    const [hideQuestions, hideQuestion] = useState(true);
    const [requiredQuestions, setRequired] = useState(false);

    const TeamSchema = yup.object({
        "team code": yup.string().required().min(5)
            .test('testValidCode', "Invalid Code or the team is not accepting new members", async value => {
                const teams = await Edge.teams.getAllTeams();
                if (teams != null) {
                    for (let [K, V] of teams) {
                        if (V.inviteData?.acceptNewMembers && V.inviteData?.teamCode === value) {

                            if (Object.keys(V.modules.teamQuestions).filter(i => i !== 'required').length) {

                                hideQuestion(false)
                                setRequired(V.modules.teamQuestions.required);

                                return false;

                            }//b3e6b0

                            return true;
                        }
                    }
                }
                return false;
            })
    })

    const openQuestions = () => {



    }

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

                        <HiddenView hide={hideQuestions}>
                            <Text
                                style={{...globalStyles.errorText, marginTop: -5}}>
                                {requiredQuestions ? "This team requires you to fill out questions" :
                                "This team has questions to answer but are optional"}
                            </Text>

                            <TouchableOpacity style={{
                                padding: 15,
                                backgroundColor: colors.mainButton,
                                borderRadius: 20,
                                marginBottom: 20
                            }} onPress={openQuestions}>
                                <Text style={{color: 'white',
                                    fontSize: 15,
                                    alignSelf: 'center',
                                    fontWeight: 'bold'
                                }}>Click Here to Fill out the Questions</Text>
                            </TouchableOpacity>

                        </HiddenView>

                        <FlatButton text="Join!" onPress={props.handleSubmit}/>

                    </View>

                )}

            </Formik>

        </View>
    )

}