import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, TextInput} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";

class QuestionCreationPage extends Component {

    state = {
        questions:[]
    }

    generateNewQuestion(){

        return(
            <View style={{backgroundColor: 'white', padding: 50}} key={this.state.questions.length}>
                <TextInput
                    style={{padding: 20}}
                    fontSize={20}
                placeholder={"Question"}
                placeholderTextColor={"lightgrey"}/>
                <Text>hi</Text>
            </View>
        )

    }

    addQuestion(){

        let question = this.generateNewQuestion();
        this.setState({questions: [...this.state.questions, question]})

    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <ScrollView ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>

                    {this.state.questions}

                </ScrollView>

                <TouchableOpacity style={globalStyles.newButton}>
                    <Ionicons name={'add'} size={35} style={{alignSelf: 'center', color: 'gold'}} onPress={() => this.addQuestion()}/>
                </TouchableOpacity>

            </View>
        );
    }

}

export default QuestionCreationPage;