import React, {Component} from 'react';
import {ScrollView, Text, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import styles from './styles'
import colors from "../../styles";
import HiddenView from "../../../Components/HiddenView";
import {
    generateCheckBoxes,
    generateLongAnswerInput,
    generateMultipleChoice,
    generateShortAnswerInput
} from "./QuestionMethods";

class ViewQuestions extends Component {

    state = {
        questions: {},
        filledQuestions: {},
        freezeScreen: false
    }

    constructor(props) {
        super(props);
        let data = this.props.navigation.getParam("filledInData") || {};
        this.state = {
            freezeScreen: this.props.navigation.getParam("freezeScreen"),
            questions: this.props.navigation.getParam("data"),
            filledQuestions: data
        };

    }

    fillQuestions(data) {
        if (data._ === 0) return;//edge case
        const questions = this.state.questions;
        Object.entries(data).forEach(i => {

            const key = i[0], value = i[1];
            const question = questions[key];
            if(question) {
                if (question.type === "multipleChoice") {

                    const choice = question.multipleChoice;
                    choice.forEach(m => {
                        m.isFilled = m.option === value;
                    })

                    this.updateQuestion(key, "multipleChoice", choice);

                } else if (question.type === "checkBoxes") {

                    question.multipleChoice.forEach(j => {
                        j.isChecked = value.some(m => m === j.option);
                    });
                    this.updateQuestion(key, "multipleChoice", question.multipleChoice);

                }
            }
        })

    }

    componentDidMount() {

        if (this.props.navigation.getParam("filledInData")) {
            this.fillQuestions(this.props.navigation.getParam("filledInData"));
        }

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
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

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
                                    }} key={uuid} pointerEvents={(this.state.freezeScreen ? 'none' : 'auto')}>

                                    <View>
                                        <Text style={{
                                            ...styles.questionInput,
                                            fontSize: 20,
                                            color: (values.required ? 'blue' : 'grey')
                                        }}>
                                            {(values.question ? values.question : "Question " + (index))}
                                        </Text>

                                        <HiddenView hide={values.type !== 'shortAnswer'}>
                                            {generateShortAnswerInput((
                                                typeof this.state.filledQuestions[uuid] === 'string' ?
                                                    this.state.filledQuestions[uuid] : null))}
                                        </HiddenView>

                                        <HiddenView hide={values.type !== 'longAnswer'}>
                                            {generateLongAnswerInput((
                                                typeof this.state.filledQuestions[uuid] === 'string' ?
                                                    this.state.filledQuestions[uuid] : null))}
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

            </View>
        );
    }


}

export default ViewQuestions;