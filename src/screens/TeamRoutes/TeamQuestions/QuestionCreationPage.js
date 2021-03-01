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
        questions: [],
        questionInfo: {}
    }

    /*
    Example Object of question Info:
    {
        type: "shortAnswer",
        question: "What is 2+2?",
        content: [JSX Elements]
    }
     */

    constructor(props) {
        super(props);
        this.generateNewQuestion.bind(this)
    }

    updateQuestion(questionUUID, path, value) {

        let questions = this.state.questionInfo
        if (questions[questionUUID])
            questions[questionUUID][path] = value;
        else {
            let obj = {};
            obj[path] = value;
            questions[questionUUID] = obj;
        }
        this.setState({questionInfo: questions})

    }

    updateCardType(cardUUID, type){

        console.log(type);
        switch (type) {
            case "shortAnswer":{
                console.log(1);
                let obj = this.state.questionInfo[cardUUID];
                obj.content = [this.generateShortAnswerInput()];
                this.setState({questionInfo: obj})
                this.setState({questions: [...this.state.questions]})
                this.forceUpdate()

            }
        }

    }

    generateShortAnswerInput = (uuid) => {

        console.log(uuid, 'uuidd');
        console.log(this.state.questionInfo[uuid]?.type);
        return(
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

    generateNewQuestion() {
        const uuid = createUUID('xxxxx')
        return (
            <View style={{backgroundColor: 'white', padding: 50, marginTop: 5, borderWidth: 2, borderColor: 'black'}} key={uuid}>
                <TextInput
                    style={{
                        padding: 15,
                        marginBottom: 5,
                        borderBottomWidth: 2,
                        borderColor: 'grey',
                        backgroundColor: 'lightgrey',
                    }}
                    multiline={true}
                    fontSize={20}
                    placeholder={"Question"}
                    placeholderTextColor={"grey"}
                    onChangeText={val => {
                        this.updateQuestion(uuid, 'question', val)
                    }}
                />

                <DropDownPicker placeholder={"Select a question type"}
                                items={[
                                    {label: "Short Answer", value: "shortAnswer"}
                                ]} onChangeItem={item => {
                    this.updateQuestion(uuid, "type", item.value);
                    this.updateCardType(uuid, item.value)
                    console.log(this.state.questionInfo[uuid].content.length, 12)

                }}/>

                <HiddenView hide={this.state.questionInfo[uuid] ? !this.state.questionInfo[uuid].content.length : false}>
                    {() => this.generateShortAnswerInput(uuid)}
                </HiddenView>

            </View>
        )

    }

    addQuestion() {

        let question = this.generateNewQuestion();
        this.setState({questions: [...this.state.questions, question]})

    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <ScrollView ref={ref => {
                    this.scrollView = ref
                }} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>

                    {this.state.questions}

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