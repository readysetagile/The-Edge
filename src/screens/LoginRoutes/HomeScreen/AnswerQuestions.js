import React, {Component} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import styles from '../../TeamRoutes/TeamQuestions/styles'
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import HiddenView from "../../../Components/HiddenView";
import CheckBox from "react-native-check-box";
import {
    generateCheckBoxes,
    generateChoiceOption, generateLongAnswerInput,
    generateMultipleChoice,
    generateShortAnswerInput
} from "../../TeamRoutes/TeamQuestions/QuestionMethods";
import FlatButton from "../../../Components/SubmitButton";
//b3e6b0
class AnswerQuestions extends Component {


    state = {
        questions: {}
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({questions: this.props.questions})
    }

    updateQuestion(questionUUID, path, value) {

        let questions = this.state.questions
        questions[questionUUID][path] = value;
        this.setState({questions: questions})

    }

    generateMultipleChoice(choices, uuid) {
        return generateMultipleChoice(choices, uuid, this.state.questions,
            (questionID, path, value) => this.updateQuestion(questionID, path, value));
    }


    checkBox(uuid, index, choice) {

        let questions = this.state.questions;
        let answer = questions[uuid].multipleChoice[index];
        choice.isChecked = !choice.isChecked;
        questions[uuid].multipleChoice[index] = answer;
        this.updateQuestion(uuid, "multipleChoice", questions[uuid].multipleChoice)

    }

    generateCheckBoxes(choices, uuid) {
        return generateCheckBoxes(choices, uuid, (uuid, index, choice) => this.checkBox(uuid, index, choice));
    }


    render() {

        const questions = this.state.questions || {}

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background, paddingTop: 35}}>

                <ScrollView ref={ref => {
                    this.scrollView = ref
                }} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>

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
                                            {generateShortAnswerInput()}
                                        </HiddenView>

                                        <HiddenView hide={values.type !== 'longAnswer'}>
                                            {generateLongAnswerInput()}
                                        </HiddenView>

                                        <HiddenView hide={values.type !== 'multipleChoice'}>
                                            {this.generateMultipleChoice(values.multipleChoice, uuid)}
                                        </HiddenView>

                                        <HiddenView hide={values.type !== 'checkBoxes'}>
                                            {this.generateCheckBoxes(values.multipleChoice, uuid)}
                                        </HiddenView>

                                    </View>

                                </View>
                            )

                        })
                    }

                </ScrollView>

                <FlatButton text={"Submit!"}/>

            </View>
        );
    }


}

export default AnswerQuestions;