import React, {Component} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import {createUUID} from "../../../firebase/Util";

class QuestionCreationPage extends Component {

    state = {
        questions: [],
        questionInfo: {}
    }

    /*
    Example Object of question Info:
    {
        type: "shortAnswer",

    }
     */

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

    generateNewQuestion(uuid) {

        return (
            <View style={{backgroundColor: 'white', padding: 50}} key={uuid}>
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
                    this.updateQuestion(uuid, "type", item.value)
                }}/>

            </View>
        )

    }

    addQuestion() {

        let question = this.generateNewQuestion(createUUID("xxxxx"));
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