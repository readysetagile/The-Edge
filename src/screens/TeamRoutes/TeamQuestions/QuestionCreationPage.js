import React, {Component} from 'react';
import {Alert, Button, ScrollView, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import {createUUID} from "../../../firebase/Util";
import HiddenView from "../../../Components/HiddenView";
import CheckBox from 'react-native-check-box'
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import styles from './styles'
import Edge from "../../../firebase";
import GlobalData from '../../../GlobalData';

class QuestionCreationPage extends Component {

    state = {
        questionInfo: {
            required: true
        }
    }

    constructor(props) {
        super(props);
    }

    /**
     * Updates a question so that it can be shown to a user properly
     * @param questionUUID the question id to update
     * @param path the property to update
     * @param value the new value of this property
     */
    updateQuestion(questionUUID, path, value) {

        let questions = this.state.questionInfo
        if (questions[questionUUID])
            questions[questionUUID][path] = value;
        else {
            questions[questionUUID] = {[path]: value};
        }
        this.setState({questionInfo: questions})
        this.props.navigation.setParams({questionInfo: questions});

    }

    /**
     * Generates a new short answer element
     * @returns {JSX.Element}
     */
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

    /**
     * Generates a new long answer element
     * @returns {JSX.Element}
     */
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
                    placeholder={"Long Answer Text"}
                    placeholderTextColor={"grey"}/>
            </View>
        )
    }

    /**
     * When the component mounts, we need to get the saved team question state
     */
    componentDidMount() {

        Edge.teams.get(GlobalData.teamID).then(team => {
            const questions = team.getTeamQuestions();
            if (questions != null) {
                this.setState({questionInfo: questions})
                this.props.navigation.setParams({questionInfo: questions});
            }
        })

    }

    /**
     * When component unmounts, we save the questions in case they forgot to press save
     */
    componentWillUnmount() {
        this.saveQuestions(false);
    }

    /**
     * Generates a new multiple choice question
     * @param choices the choices in the question
     * @param uuid the id of the question
     * @returns {JSX.Element}
     */
    generateMultipleChoice(choices, uuid) {

        return (

            <View>

                {choices?.map((choice, index) => (

                    <View style={{flexDirection: 'row', marginTop: 10}} key={index}>

                        <Ionicons name={choice.isFilled ? "ellipse" : "ellipse-outline"} size={15}
                                  style={{alignSelf: 'center'}}/>
                        {this.generateChoiceOption(choice, uuid, index)}

                        {this.generateDeleteSymbol(choices, uuid, index)}

                    </View>

                ))}

                <TouchableOpacity
                    onPress={() => this.updateQuestion(uuid, "multipleChoice", [...choices, {isFilled: false}])}>

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

    /**
     * Generates a remove symbol from ion icons (-)
     * @param choices the choices of the card
     * @param uuid the id of the card
     * @param index the index of the choice
     * @returns {JSX.Element}
     */
    generateDeleteSymbol(choices, uuid, index) {

        return (
            <Ionicons name={"remove-circle-outline"} size={15} style={{alignSelf: 'center'}} onPress={() => {
                let question = this.state.questionInfo[uuid];
                let multiChoices = question.multipleChoice;
                if (choices.length > 1) {
                    multiChoices.splice(index, 1)
                    question.multipleChoice = multiChoices;
                    this.updateQuestion(uuid, "multipleChoice", multiChoices);
                } else if (multiChoices[index].option) {
                    multiChoices[index].option = ""
                    this.updateQuestion(uuid, "multipleChoice", multiChoices);
                }
            }}/>
        )

    }

    generateChoiceOption(choice, uuid, index) {

        return (
            <TextInput style={{borderBottomWidth: 3, borderColor: 'blue', padding: 10, width: '100%'}}
                       placeholder={"Option " + (index + 1)}
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

    generateCheckBoxes(choices, uuid) {

        return (

            <View>

                {choices?.map((choice, index) => (

                    <View style={{flexDirection: 'row', marginTop: 10}} key={index}>

                        <CheckBox isChecked={choice.isChecked} onClick={() => {
                        }}/>
                        {this.generateChoiceOption(choice, uuid, index)}

                        {this.generateDeleteSymbol(choices, uuid, index)}

                    </View>

                ))}

                <TouchableOpacity
                    onPress={() => this.updateQuestion(uuid, "multipleChoice", [...choices, {isFilled: false}])}>

                    <View style={{flexDirection: 'row', marginTop: 10}}>

                        <CheckBox isChecked={false} onClick={() => {
                        }}/>
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
            type: "shortAnswer",
            question: "Question " + (Object.keys(this.state.questionInfo).length),
            multipleChoice: [{
                isFilled: false,
                option: ""
            }],
            required: false,
            optionsOpened: false,
            isDisabled: false
        }

        const uuid = createUUID('xxxx');
        this.setState({questionInfo: {...this.state.questionInfo, [uuid]: newObj}})
        this.props.navigation.setParams({questionInfo: {...this.state.questionInfo, [uuid]: newObj}});

    }

    deleteQuestion(uuid) {

        let questions = this.state.questionInfo;
        delete questions[uuid];
        this.setState({questionInfo: questions})

    }

    generateCardOptions(choice, uuid) {

        return (

            <Menu opened={choice.optionsOpened}
                  onBackdropPress={() => this.updateQuestion(uuid, 'optionsOpened', false)}>
                <MenuTrigger>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption style={{padding: 10}}
                                onSelect={() => this.updateQuestion(uuid, "isDisabled", !choice.isDisabled)}>
                        <Text style={{color: 'maroon', fontSize: 15}}>{choice.isDisabled ? "Enable" : "Disable"}</Text>
                    </MenuOption>
                    <MenuOption style={{padding: 10}} onSelect={() => this.deleteQuestion(uuid)}>
                        <Text style={{color: 'red', fontSize: 15}}>Delete</Text>
                    </MenuOption>
                </MenuOptions>

            </Menu>

        )

    }

    saveQuestions(alertUser) {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.setTeamQuestions(Object.assign({}, this.state.questionInfo));
            alertUser ? Alert.alert("Questions Saved!", "Questions also save when you leave this page") : {}
        })
    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <View style={globalStyles.topToolBar}>

                    <Text style={{alignSelf: 'center'}}>Total
                        Questions: {Object.keys(this.state.questionInfo).length - 1}</Text>

                    <Button title={"Save!"} color={'yellow'} style={{borderColor: 'red', padding: 10}} onPress={() => {
                        this.saveQuestions(true);
                    }}/>

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Text style={{alignSelf: 'center', paddingRight: 5}}>Require Submissions?</Text>
                        <CheckBox
                            isChecked={this.state.questionInfo.required}
                            onClick={() => {
                                let questions = this.state.questionInfo
                                questions.required = !questions.required;
                                this.setState({questionInfo: questions});
                            }}
                            style={{alignSelf: 'center'}}
                        />
                    </View>


                </View>

                <ScrollView ref={ref => {
                    this.scrollView = ref
                }} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                            style={{paddingBottom: 10}}>

                    {
                        Object.entries(this.state.questionInfo).filter(i => typeof i[1] === 'object').map((question, index) => {
                            const values = question[1];
                            const uuid = question[0];
                            return (
                                <View
                                    style={{
                                        ...styles.cardContent,
                                        borderColor: (values.required ? 'blue' : 'black'),
                                        zIndex: Object.keys(this.state.questionInfo).length - index,
                                    }}
                                    key={uuid} opacity={values.isDisabled ? .5 : 1}>

                                    <Ionicons name={'ellipsis-vertical'} size={25}
                                              style={{position: 'absolute', marginTop: 20, right: 5}}
                                              onPress={() => this.updateQuestion(uuid, "optionsOpened", true)}>
                                        {this.generateCardOptions(values, uuid, index)}
                                    </Ionicons>

                                    <View pointerEvents={values.isDisabled ? 'none' : 'auto'}>

                                        <TextInput
                                            style={{...styles.questionInput}}
                                            multiline={true}
                                            fontSize={20}
                                            placeholder={"Question " + (index + 1)}
                                            placeholderTextColor={(values.required ? 'blue' : 'grey')}
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