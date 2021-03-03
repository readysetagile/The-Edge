import React, {Component} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View, Text, Switch, Image} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import {createUUID} from "../../../firebase/Util";
import HiddenView from "../../../Components/HiddenView";
import CheckBox from 'react-native-check-box'
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import styles from "../../LoginRoutes/ProfileScreen/styles";


class QuestionCreationPage extends Component {

    state = {
        showItem: false,
        questions: [],
        questionInfo:[]
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
                        fontSize: 15,
                    }}
                    editable={false}
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
                    editable={false}
                    multiline={true}
                    placeholder={"Short Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )
    }

    generateMultipleChoice(choices, uuid) {

        return (

            <View>

                {choices?.map((choice, index) => (

                    <View style={{flexDirection: 'row', marginTop: 10}} key={index}>

                        <Ionicons name={choice.isFilled ? "ellipse" : "ellipse-outline"} size={15} style={{alignSelf: 'center'}}/>
                        {this.generateChoiceOption(choice, uuid, index)}

                        {this.generateDeleteSymbol(choices, uuid, index)}

                    </View>

                ))}

                <TouchableOpacity onPress={() => this.updateQuestion(uuid, "multipleChoice", [...choices, {isFilled: false}])}>

                    <View style={{flexDirection: 'row', marginTop: 10}}>

                        <Ionicons name={"ellipse-outline"} size={15} style={{alignSelf: 'center'}}/>
                        <TextInput style={{borderBottomWidth: 3, borderColor: 'lightblue', padding: 10, width: '100%'}}
                                   placeholder={"Add Option"}
                                   placeholderTextColor={"grey"}
                                   editable={false}
                                   onTouchStart={() => this.updateQuestion(uuid, "multipleChoice", [...choices, {isFilled: false}])}
                                   />

                    </View>
                </TouchableOpacity>


            </View>

        )

    }

    generateDeleteSymbol(choices, uuid, index){

        return(
            <Ionicons name={"remove-circle-outline"} size={15} style={{alignSelf: 'center'}} onPress={() => {
                if(index > 0 || choices.length > 1) {
                    let question = this.state.questionInfo[uuid];
                    let multiChoices = question.multipleChoice;
                    multiChoices.splice(index, 1)
                    question.multipleChoice = multiChoices;
                    this.updateQuestion(uuid, "multipleChoice", multiChoices);
                }
            }}/>
        )

    }

    generateChoiceOption(choice, uuid, index){

        return(
            <TextInput style={{borderBottomWidth: 3, borderColor: 'blue', padding: 10, width: '100%'}}
                       placeholder={"Option " + (index+1)}
                       placeholderTextColor={"grey"}
                       multiline={true}
                       value={choice.option}
                       onChangeText={(val) => {
                           let question = this.state.questionInfo[uuid];
                           let mc = question.multipleChoice
                           mc[index].option = val;
                           this.updateQuestion(uuid, "multipleChoice", mc)
                       }}/>
        );

    }

    generateCheckBoxes(choices, uuid){

        return (

            <View>

                {choices?.map((choice, index) => (

                    <View style={{flexDirection: 'row', marginTop: 10}} key={index}>

                        <CheckBox isChecked={choice.isChecked} onClick={() => {}}/>
                        {this.generateChoiceOption(choice, uuid, index)}

                        {this.generateDeleteSymbol(choices, uuid, index)}

                    </View>

                ))}

                <TouchableOpacity onPress={() => this.updateQuestion(uuid, "multipleChoice", [...choices, {isFilled: false}])}>

                    <View style={{flexDirection: 'row', marginTop: 10}}>

                        <CheckBox isChecked={false} onClick={() => {}}/>
                        <TextInput style={{borderBottomWidth: 3, borderColor: 'lightblue', padding: 10, width: '100%'}}
                                   placeholder={"Add Option"}
                                   placeholderTextColor={"grey"}
                                   editable={false}
                                   onTouchStart={() => this.updateQuestion(uuid, "multipleChoice", [...choices, {isFilled: false}])}
                        />

                    </View>
                </TouchableOpacity>


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
                isFilled: false,
                option: ""
            }],
            required: false,
            optionsOpened: false
        }

        this.setState({questionInfo: {...this.state.questionInfo, [createUUID('xxxx')]: newObj}})

    }

    generateCardOptions(choice, uuid, index){

        return(

                <Menu opened={choice.optionsOpened} onBackdropPress={() => this.updateQuestion(uuid, 'optionsOpened', false)}>
                    <MenuTrigger onPress={() => console.log(1)}>
                    </MenuTrigger>
                    <MenuOptions >
                        <MenuOption onSelect={() => console.log(2)}>
                            <Text style={{color: 'maroon'}}>Disable</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => console.log(3)}>
                            <Text style={{color: 'red'}}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>

                </Menu>

        )

    }


    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <ScrollView ref={ref => {
                    this.scrollView = ref
                }} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>

                    {
                        Object.entries(this.state.questionInfo).map((question, index) => {

                            const values = question[1];
                            const uuid = question[0];
                            return (
                                <View
                                    style={{
                                    backgroundColor: 'white',
                                    paddingTop: 50,
                                    paddingLeft: 50,
                                    paddingRight: 50,
                                    paddingBottom: 20,
                                    marginTop: 5,
                                    borderWidth: 3,
                                    borderColor: (values.required ? 'blue' : 'black'),
                                    borderRadius: 5,
                                    zIndex: Object.keys(this.state.questionInfo).length-index
                                }} key={uuid}>

                                    <Ionicons name={'ellipsis-vertical'} size={25} style={{position: 'absolute', marginTop: 20, right: 5}}
                                              onPress={() => this.updateQuestion(uuid, "optionsOpened", true)}>
                                        {this.generateCardOptions(values, uuid, index)}
                                    </Ionicons>


                                    <TextInput
                                        style={{
                                            padding: 15,
                                            marginBottom: 5,
                                            borderBottomWidth: 2,
                                            borderColor: 'grey',
                                            backgroundColor: 'lightgrey'
                                        }}
                                        value={question.question}
                                        multiline={true}
                                        fontSize={20}
                                        placeholder={"Question " + (index+1)}
                                        placeholderTextColor={"grey"}
                                        onChangeText={value => {
                                            this.updateQuestion(uuid, 'question', value)
                                        }}

                                    />

                                        <DropDownPicker placeholder={"Select a question type"}
                                                        items={[
                                                            {label: "Short Answer", value: "shortAnswer"},
                                                            {label: "Long Answer", value: "longAnswer"},
                                                            {label: "Multiple Choice", value: "multipleChoice"},
                                                            {label: "Check Boxes", value: "checkBoxes"}
                                                        ]} onChangeItem={item => {
                                            this.updateQuestion(uuid, 'type', item.value)
                                        }}/>

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

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                        zIndex: 0
                                    }}>
                                        <Text style={{fontSize: 20}}>Required?</Text>
                                        <Switch
                                            value={values.required}
                                            trackColor={{false: "white", true: "#81b0ff"}}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={value => this.updateQuestion(uuid, "required", value)}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>

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