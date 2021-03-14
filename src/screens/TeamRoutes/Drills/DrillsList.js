import React, {Component} from 'react';
import {Modal, Text, TextInput, View, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import styles from "../../LoginRoutes/ProfileScreen/styles";
import {SliderHuePicker, SliderSaturationPicker,} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import {createUUID} from "../../../firebase/Util";
import NewDrill from "./NewDrill";
import GlobalData from '../../../GlobalData';
import Edge from "../../../firebase/index";
import InputText from "../../../Components/InputText";

class DrillsList extends Component {

    state = {
        tags: {},
        drills: {},
        showModal: false,
        showTagNameInput: false
    }
    editingNameTag = "";
    tagEditColor = null;

    constructor(props) {
        super(props);
    }

    changeTagName(tag, newName){
        if(newName && tag.name !== newName){
            const tags = this.state.tags;
            delete tags[tag.name];
            tags[newName] = tag;
            this.setState({tags: tags})
            this.editingNameTag = ""

        }
    }

    changeTagColor(tag, newColor){
        if(newColor && tag.color !== newColor) {
            this.state.tags[tag.name].color = newColor;
            this.setState({
                tags: this.state.tags
            })
        }

    }


    generateTag(tag, onPress) {

        return (

            <Menu key={tag.name} onOpen={() => {
                this.editingNameTag = tag.name
                this.tagEditColor = tag.color;
            }} onClose={() => {
                this.changeTagName(tag, this.editingNameTag)
            }}>

                <MenuTrigger triggerOnLongPress={true} onAlternativeAction={() => console.log(2)}>
                    <View style={{
                        flexDirection: 'row', padding: 15, flexWrap: 'wrap',
                        borderBottomWidth: 2, borderTopWidth: 2, borderColor: 'grey'
                    }}>
                        <FontAwesome name={'tag'} size={24} color={tag.color} style={{alignSelf: 'center'}}
                                     onPress={() => onPress()}/>
                        <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{tag.name}</Text>

                        <View style={{flex: 1}}>
                            <MaterialIcons name={tag.contentHidden ? 'arrow-drop-up' : 'arrow-drop-down'}
                                           size={30} color={'grey'} style={{alignSelf: 'flex-end'}}/>
                        </View>

                    </View>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>

                        <View style={{padding: 15, flexDirection: 'row', flex: 1}}>
                            <Text style={{alignSelf: 'center', padding: 2, fontSize: 20}}>Name: </Text>
                            <TextInput ref={ref => {this.tagNameInput = ref}}
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderColor: 'grey',
                                    flex: 1
                                }}
                                placeholder={tag.name}
                                onChangeText={val => {
                                    this.editingNameTag = val
                                }}

                            />
                        </View>

                    </MenuOption>
                    <MenuOption>

                        {this.createColorSliders(tag)}

                    </MenuOption>

                    <MenuOption onSelect={() => {
                        Alert.alert("Are you sure you want to delete this tag?",
                            "This will not remove any drills under it", [
                            {
                                text: "Yes",
                                onPress: () => {
                                    this.deleteTag(tag);
                                }
                            },
                            {
                                text: 'Cancel'
                            }
                        ]);
                    }}>

                        <Text style={{fontSize: 20, color: 'red', padding: 20, alignSelf: 'center'}}>Delete Tag</Text>

                    </MenuOption>

                </MenuOptions>

            </Menu>


        )

    }

    deleteTag(tag){

        const tags = this.state.tags;
        delete tags[tag.name];
        this.setState({tags: tags});
        Edge.teams.get(GlobalData.teamID).then(team => {
            team.removeTag(tag.name);
        })

    }

    createColorSliders(tag){

        return(
            <View>

                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, flex: 1}}>
                    <SliderHuePicker
                        ref={view => {
                            this.sliderHuePicker = view;
                        }}
                        oldColor={this.tagEditColor}
                        trackStyle={[{height: 12, width: '100%'}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={(colorHsvOrRgb, resType) => {
                            this.changeTagColor(tag, tinycolor(colorHsvOrRgb).toHexString())
                        }}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, flex: 1}}>
                    <SliderSaturationPicker
                        ref={view => {
                            this.sliderSaturationPicker = view;
                        }}
                        oldColor={this.state.tags[tag.name].color}
                        trackStyle={[{height: 12, width: '100%'}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={(colorHsvOrRgb, resType) => {
                            this.changeTagColor(tag, tinycolor(colorHsvOrRgb).toHexString())
                        }}
                        style={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: tinycolor({
                                h: tinycolor(this.state.tags[tag.name].color).toHsv().h,
                                s: 1,
                                v: 1
                            }).toHexString()
                        }}
                    />
                </View>

            </View>
        )

    }

    createDrill() {

        let drills = this.state.drills;
        drills[createUUID('xxxxx')] = {
            tags: []
        }
        this.setState({showModal: true});

    }

    createTag = () => {
        this.setState({showTagNameInput: true});
    }

    addItem() {

        const options = ['Create Drill', 'Create Tag', 'Cancel'];
        const cancelButtonIndex = 2;
        const actionMap = {
            0: this.createDrill.bind(this),
            1: this.createTag.bind(this),
        }

        this.props.showActionSheetWithOptions({
                options, cancelButtonIndex
            },
            buttonIndex => {
                if (actionMap[buttonIndex] != null) actionMap[buttonIndex]("hello");
            })

    }

    showTag(tagName) {

    }


    exitDrillEditor(){

        Alert.alert("Save Changes?", "", [
            {
                text: "Save",
                onPress: () => {
                    this.setState({showModal: false});
                }
            },
            {
                text: "Discard Changes"
            },
            {
                text:"Cancel"
            }
        ])

    }

    handleTagNameChange = (name) => {
        this.setState({newTagName: name})
    }

    addTag = () => {
        let tags = this.state.tags;
        const name = this.state.newTagName;

        if(!name){
            Alert.alert("Invalid Tag Name", "Please input a tag name");
            return;
        }else if(tags.hasOwnProperty(name)){
            Alert.alert("Invalid Tag Name", "There is already an existing tag with this name");
            return;
        }

        tags[name] = {
            color: 'gold',
            name: name,
            contentHidden: true
        }
        this.setState({showTagNameInput: false, tags: tags, newTagName: ""});

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.addTag(name, tags[name]);
        })
    }

    componentDidMount() {

        Edge.teams.get(GlobalData.teamID).then(team => {
            const tags = team.modules.drills?.tags || {};
            this.setState({tags: tags});
        })

    }

    onTagNameCancel = () => {
        this.setState({showTagNameInput: false})
    }


    render() {

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <InputText title={"Name this Tag!"} description={"What do you want this tag to be called?"}
                placeholder={"Tag Name"} onTextChange={this.handleTagNameChange} onCancel={this.onTagNameCancel}
                visible={this.state.showTagNameInput} onSubmit={this.addTag} onBackDropPress={this.onTagNameCancel}/>


                <Modal visible={this.state.showModal} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Ionicons style={{...globalStyles.closeModal(3), padding: 15}}
                                      name={"checkmark-circle-outline"} size={24}
                                      onPress={() => this.exitDrillEditor()} />

                                      <NewDrill/>

                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <View style={globalStyles.topToolBar}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Total Drills: 0</Text>
                    <View style={globalStyles.searchToolBar}>
                        <TextInput
                            placeholderTextColor={'#003f5c'}
                            placeholder='Search 🔎'
                            onChangeText={(val) => {
                            }}>
                        </TextInput>
                    </View>
                </View>

                {
                    Object.entries(this.state.tags).map((i, j) => {

                        const name = i[0];
                        const content = i[1];
                        if(content){
                            content.name = name;
                            return this.generateTag(content, () => console.log(1));
                        }
                    })
                }

                <NewButton onPress={() => this.addItem()}/>{/*TODO: check for coach before displaying this*/}

            </View>
        );
    }
}

const DrillsListApp = connectActionSheet(DrillsList);
export default DrillsListApp;
