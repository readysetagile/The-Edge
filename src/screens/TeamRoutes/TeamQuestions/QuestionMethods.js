import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import CheckBox from "react-native-check-box";

export function generateMultipleChoice(choices, uuid, stateQuestions, onPress, props = null) {

    return (

        <View>

            {choices?.map((choice, index) => (

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} key={index} onPress={() => {
                    let questions = stateQuestions;
                    let answer = questions[uuid].multipleChoice[index];
                    choices.forEach((i, j) => {
                        if (j !== index)
                            i.isFilled = false;
                    });
                    choice.isFilled = !choice.isFilled;
                    questions[uuid].multipleChoice[index] = answer;
                    props?.setFieldValue(uuid, choice.option);
                    onPress(uuid, "multipleChoice", questions[uuid].multipleChoice)
                }}>

                    <Ionicons name={choice.isFilled ? "ellipse" : "ellipse-outline"} size={15}
                              style={{alignSelf: 'center'}}/>
                    {generateChoiceOption(choice, uuid, index)}

                </TouchableOpacity>

            ))}

        </View>

    )

}

export function generateChoiceOption(choice, uuid, index) {

    return (
        <Text style={{
            borderBottomWidth: 3,
            borderColor: 'blue',
            padding: 5,
            width: '100%',
            color: 'black',
            alignSelf: 'center'
        }}>
            {(choice.option ? choice.option : "Option " + (index + 1))}
        </Text>
    );

}

export function generateLongAnswerInput() {
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

export function generateShortAnswerInput() {

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

export function generateCheckBoxes(choices, uuid, checkBox) {

    return (

        <View>

            {choices?.map((choice, index) => (

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}} key={index} onPress={() => {
                    checkBox(uuid, index, choice)
                }}>

                    <CheckBox isChecked={choice.isChecked} onClick={() => checkBox(uuid, index, choice)}/>
                    {generateChoiceOption(choice, uuid, index)}
                </TouchableOpacity>

            ))}

        </View>

    )

}