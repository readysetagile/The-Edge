import React, {Component} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import styles from './styles'
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import HiddenView from "../../../Components/HiddenView";
import CheckBox from "react-native-check-box";

class ViewQuestions extends Component {


    state = {
        questions: []
    }

    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.navigation.getParam("data")
        };

    }

    updateQuestion(questionUUID, path, value) {

        let questions = this.state.questions
        questions[questionUUID][path] = value;
        this.setState({questions: questions})

    }

    generateShortAnswerInput() {

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
                    editable={true}
                    placeholder={"Short Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )

    }

    generateLongAnswerInput() {
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
                    editable={true}
                    multiline={true}
                    placeholder={"Long Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )
    }

    generateMultipleChoice(choices, uuid) {

        return (

            <View>

                {choices?.map((choice, index) => (

                    <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} key={index} onPress={() => {
                        let questions = this.state.questions;
                        let answer = questions[uuid].multipleChoice[index];
                        choices.forEach((i, j) => {
                            if (j !== index)
                                i.isFilled = false;
                        });
                        choice.isFilled = !choice.isFilled;
                        questions[uuid].multipleChoice[index] = answer;
                        this.updateQuestion(uuid, "multipleChoice", questions[uuid].multipleChoice)
                    }}>

                        <Ionicons name={choice.isFilled ? "ellipse" : "ellipse-outline"} size={15}
                                  style={{alignSelf: 'center'}}/>
                        {this.generateChoiceOption(choice, uuid, index)}

                    </TouchableOpacity>

                ))}

            </View>

        )

    }

    generateChoiceOption(choice, uuid, index) {

        return (
            <Text style={{borderBottomWidth: 3, borderColor: 'blue', padding: 5, width: '100%', color: 'black', alignSelf: 'center'}}>
                {(choice.option ? choice.option : "Option " + (index+1))}
            </Text>
        );

    }

    checkBox(uuid, index, choice){

        let questions = this.state.questions;
        let answer = questions[uuid].multipleChoice[index];
        choice.isChecked = !choice.isChecked;
        questions[uuid].multipleChoice[index] = answer;
        this.updateQuestion(uuid, "multipleChoice", questions[uuid].multipleChoice)

    }

    generateCheckBoxes(choices, uuid) {

        return (

            <View>

                {choices.map((choice, index) => (

                    <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} key={index} onPress={() => {
                        this.checkBox(uuid, index, choice)
                    }}>

                        <CheckBox isChecked={choice.isChecked} onClick={() => this.checkBox(uuid, index, choice)}/>
                        {this.generateChoiceOption(choice, uuid, index)}
                    </TouchableOpacity>

                ))}

            </View>

        )

    }


    render() {

        const questions = this.state.questions

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <ScrollView ref={ref => {
                    this.scrollView = ref
                }} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>

                    {
                        Object.entries(questions).map((question, index) => {

                            const values = question[1];
                            const uuid = question[0];
                            if(values.isDisabled) return null;
                            return (
                                <View
                                    style={{...styles.cardContent,
                                        borderColor: (values.required ? 'blue' : 'black'),
                                        zIndex: Object.keys(questions).length - index,
                                        paddingBottom: 50
                                    }} key={uuid}>

                                    <View>
                                        <Text style={{...styles.questionInput,
                                            fontSize: 20,
                                            color: (values.required ? 'blue' : 'grey')}}>
                                            {(values.question ? values.question : "Question " + (index+1))}
                                        </Text>

                                        <HiddenView hide={values.type !== 'shortAnswer'}>
                                            {this.generateShortAnswerInput()}
                                        </HiddenView>

                                        <HiddenView hide={values.type !== 'longAnswer'}>
                                            {this.generateLongAnswerInput()}
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