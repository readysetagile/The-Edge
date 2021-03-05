import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import styles from '../../TeamRoutes/TeamQuestions/styles'
import colors from "../../styles";
import HiddenView from "../../../Components/HiddenView";
import {
    generateCheckBoxes,
    generateMultipleChoice,
} from "../../TeamRoutes/TeamQuestions/QuestionMethods";
import FlatButton from "../../../Components/SubmitButton";
import * as yup from 'yup';
import {Formik} from 'formik';

//b3e6b0
class AnswerQuestions extends Component {

    state = {
        questions: {},
        FormValidationSchema: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const ValidationSchema = {};
        const questions = this.props.questions;
        console.log(Object.keys(questions));
        for(const property in questions){
            if(questions.hasOwnProperty(property)) {
                if(questions[property] instanceof Object) {

                    let object = {
                        [property]: (questions[property].type !== "checkBoxes" ? yup.string() : yup.array())
                    };

                    if (questions[property].required)
                        object[property] = object[property].required("This is a required field");

                    ValidationSchema[property] = object[property];
                }
            }
        }
        this.setState({questions: this.props.questions, FormValidationSchema: yup.object(ValidationSchema)})

    }

    updateQuestion(questionUUID, path, value) {

        let questions = this.state.questions
        questions[questionUUID][path] = value;
        this.setState({questions: questions})

    }

    generateMultipleChoice(choices, uuid, props) {
        return generateMultipleChoice(choices, uuid, this.state.questions,
            (questionID, path, value) => this.updateQuestion(questionID, path, value), props);
    }

    checkBox(uuid, index, choice, props) {

        let questions = this.state.questions;
        let answer = questions[uuid].multipleChoice[index];
        choice.isChecked = !choice.isChecked;
        questions[uuid].multipleChoice[index] = answer;
        let checkedBoxes = props.values[uuid];

        if(!checkedBoxes){
            checkedBoxes = []
        }

        if(choice.isChecked)
            checkedBoxes.push(choice.option);
        else checkedBoxes = checkedBoxes.filter(i => i !== choice.option);

        props.setFieldValue(uuid, checkedBoxes)
        this.updateQuestion(uuid, "multipleChoice", questions[uuid].multipleChoice)

    }

    generateCheckBoxes(choices, uuid, props) {
        return generateCheckBoxes(choices, uuid, (uuid, index, choice) => this.checkBox(uuid, index, choice, props));
    }

    generateLongAnswerInput(props, questionUUID){

        return (
            <View>
                <TextInput
                    style={{
                        padding: 10,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        borderColor: 'grey',
                        fontSize: 15,
                    }}
                    onChangeText={props.handleChange(questionUUID)}
                    onBlur={props.handleBlur(questionUUID)}
                    editable={true}
                    multiline={true}
                    placeholder={"Long Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )

    }

    generateShortAnswerInput(props, questionUUID){

        return (
            <View>
                <TextInput
                    style={{
                        padding: 10,
                        marginTop: 10,
                        borderBottomWidth: 1,
                        borderColor: 'grey',
                        fontSize: 15,
                    }}
                    onChangeText={props.handleChange(questionUUID)}
                    onBlur={props.handleBlur(questionUUID)}
                    editable={true}
                    placeholder={"Short Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )

    }


    render() {

        const questions = this.state.questions || {}
        let initialVals = {}
        Object.entries(questions).filter(i => i[0] !== 'required').forEach(i => {
            if(i[1].type === 'checkBoxes'){
                return initialVals[i[0]] = []
            }else initialVals[i[0]] = ""
        })
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <Formik
                    initialValues={initialVals}
                    validationSchema={this.state.FormValidationSchema}
                        onSubmit={(values, actions) => {
                    console.log("submitted");
                }}>

                    {(props) => (

                        <View>

                            <ScrollView>

                                {
                                    Object.entries(questions).filter(i => typeof i[1] === 'object').map((question, index) => {

                                        const values = question[1];
                                        const uuid = question[0];
                                        if (values.isDisabled) return null;
                                        return (
                                            <View
                                                style={{
                                                    ...styles.cardContent,
                                                    borderColor: (values.required ? 'blue' : 'black'),
                                                    zIndex: Object.keys(questions).length - index,
                                                    paddingBottom: 50
                                                }} key={uuid}>

                                                <View>
                                                    <Text style={{
                                                        ...styles.questionInput,
                                                        fontSize: 20,
                                                        color: (values.required ? 'blue' : 'grey')
                                                    }}>
                                                        {(values.question ? values.question : "Question " + (index))}
                                                    </Text>

                                                    <HiddenView hide={values.type !== 'shortAnswer'}>
                                                        {this.generateShortAnswerInput(props, uuid)}

                                                    </HiddenView>

                                                    <HiddenView hide={values.type !== 'longAnswer'}>
                                                        {this.generateLongAnswerInput(props, uuid)}
                                                    </HiddenView>

                                                    <HiddenView hide={values.type !== 'multipleChoice'}>
                                                        {this.generateMultipleChoice(values.multipleChoice, uuid, props)}
                                                    </HiddenView>

                                                    <HiddenView hide={values.type !== 'checkBoxes'}>
                                                        {this.generateCheckBoxes(values.multipleChoice, uuid, props)}
                                                    </HiddenView>

                                                    <Text style={{...globalStyles.errorText, color:"black", marginBottom: 0}}>
                                                        {props.touched[uuid] && props.errors[uuid]}
                                                    </Text>

                                                </View>

                                            </View>
                                        )

                                    })
                                }

                                <FlatButton text={"Submit!"} style={{marginTop: 10}}/>

                            </ScrollView>

                        </View>

                    )}

                </Formik>

            </View>
        );
    }


}

export default AnswerQuestions;