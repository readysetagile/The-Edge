import React, {Component} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View, Text} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import {createUUID} from "../../../firebase/Util";
import HiddenView from "../../../Components/HiddenView";

class QuestionCreationPage extends Component {

    state = {
        showItem: false,
        questions: [],
        questionInfo: {},
        shortAnswer: {},
        longAnswer: {},
        multipleChoice: []
    }


    constructor(props) {
        super(props);
    }

    updateQuestion(questionUUID, path, value) {

        let questions = this.state.questionInfo
        if (questions[questionUUID])
            questions[questionUUID][path] = value;
        else {
            questions[questionUUID] = {[path]: value};
        }
        this.setState({questionInfo: questions})

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
                        fontSize: 10,
                    }}
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
                        fontSize: 10,
                    }}
                    multiline={true}
                    placeholder={"Short Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )
    }

    generateMultipleChoice(choices) {

        return (

            <View>

                {choices?.map((choice, index) => (

                    <View style={{flexDirection: 'row', marginTop: 10}}>

                        <Ionicons name={choice.isFilled ? "ellipse" : "ellipse-outline"} size={15} style={{alignSelf: 'center'}}/>
                        <TextInput style={{borderBottomWidth: 3, borderColor: 'blue', padding: 10, width: '100%'}}
                                   placeholder={"Option " + (index+1)}
                                   placeholderTextColor={"grey"}
                                   multiline={true}/>
                    </View>

                ))}

                <View style={{flexDirection: 'row', marginTop: 10}}>

                    <Ionicons name={"ellipse-outline"} size={15} style={{alignSelf: 'center'}}/>
                    <TextInput style={{borderBottomWidth: 3, borderColor: 'lightblue', padding: 10, width: '100%'}}
                               placeholder={"Add Option"}
                               placeholderTextColor={"grey"}
                               multiline={true}/>
                </View>

            </View>

        )

    }

    addQuestion() {

        let newObj = {
            type: null,
            question: "Question " + Object.keys(this.state.questionInfo).length,
            hideContent: true,
            content: null,
            multipleChoice: [{
                isFilled: false
            }]
        }

        this.setState({questionInfo: {...this.state.questionInfo, [createUUID('xxxx')]: newObj}})

    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <ScrollView ref={ref => {
                    this.scrollView = ref
                }} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>

                    {
                        Object.entries(this.state.questionInfo).map(question => {

                            let values = question[1];
                            return (
                                <View style={{
                                    backgroundColor: 'white',
                                    padding: 50,
                                    marginTop: 5,
                                    borderWidth: 2,
                                    borderColor: 'black'
                                }} key={question[0]}>
                                    <TextInput
                                        style={{
                                            padding: 15,
                                            marginBottom: 5,
                                            borderBottomWidth: 2,
                                            borderColor: 'grey',
                                            backgroundColor: 'lightgrey',
                                        }}
                                        value={question.question}
                                        multiline={true}
                                        fontSize={20}
                                        placeholder={"Question"}
                                        placeholderTextColor={"grey"}
                                        onChangeText={value => {
                                            this.updateQuestion(question[0], 'question', value)
                                        }}

                                    />

                                    <DropDownPicker placeholder={"Select a question type"}
                                                    items={[
                                                        {label: "Short Answer", value: "shortAnswer"},
                                                        {label: "Long Answer", value: "longAnswer"},
                                                        {label: "Multiple Choice", value: "multipleChoice"}
                                                    ]} onChangeItem={item => {
                                        this.updateQuestion(question[0], 'type', item.value)
                                    }}/>

                                    <HiddenView hide={values.type !== 'shortAnswer'}>
                                        {this.generateShortAnswerInput()}
                                    </HiddenView>

                                    <HiddenView hide={values.type !== 'longAnswer'}>
                                        {this.generateLongAnswerInput()}
                                    </HiddenView>

                                    <HiddenView hide={values.type !== 'multipleChoice'}>
                                        {this.generateMultipleChoice(values.multipleChoice)}
                                    </HiddenView>

                                </View>
                            )


                        })
                    }

                </ScrollView>

                <TouchableOpacity style={globalStyles.newButton}>
                    <Ionicons name={'add'} size={35} style={{alignSelf: 'center', color: 'gold'}}
                              onPress={() => this.addQuestion()}/>
                </TouchableOpacity>

            </View>
        );
    }

}

export default QuestionCreationPage;