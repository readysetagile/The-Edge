import React, {Component} from 'react';
import {Modal, Text, TextInput, View, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {SliderHuePicker, SliderSaturationPicker,} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import {createUUID} from "../../../firebase/Util";
import NewDrill from "./NewDrill";
import GlobalData from '../../../GlobalData';
import Edge from "../../../firebase/index";
import InputText from "../../../Components/InputText";
import Collapsible from "react-native-collapsible";
import styles from './styles';

class DrillsList extends Component {

    state = {
        tags: {},
        drills: {},
        showModal: false,
        showTagNameInput: false,
        showDrillNameInput: false,
        newDrillName: null,
        currentDrillEditorContent: null,
        currentDrillEditing: null
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
            Edge.teams.get(GlobalData.teamID).then(team => {
                team.removeTag(tag.name);
                team.addTag(newName, tag);
            })
            tags[newName] = tag;
            this.setState({tags: tags})
            this.editingNameTag = ""

        }
    }

    changeDrillName(drill, newName){
        if(newName && drill.name !== newName){
            const drills = this.state.drills;
            delete drills[drill.name];
            Edge.teams.get(GlobalData.teamID).then(team => {
                team.removeDrill(drill.name);
                team.addDrill(newName, drill);
            })
            drills[newName] = drill;
            this.setState({drills: drills})
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

    changeDrillColor(drill, newColor){

        if(newColor && drill.color !== newColor) {
            this.state.drills[drill.name].color = newColor;
            this.setState({
                drills: this.state.drills
            })
        }

    }

    updateItemColor(item, color, type){

        Edge.teams.get(GlobalData.teamID).then(team => {
            item.color = color;
            if(type === 'tag')
            team.addTag(item.name, item);
            else team.addDrill(item.name, item);
        })

    }


    generateTag(tag, onPress) {

        return (

            <View key={tag.name}>

                <Menu onOpen={() => {
                    this.editingNameTag = tag.name
                    this.tagEditColor = tag.color;
                }} onClose={() => {
                    this.changeTagName(tag, this.editingNameTag)
                    this.updateItemColor(tag, tag.color, 'tag');
                }}>

                    <MenuTrigger triggerOnLongPress={true} onAlternativeAction={() => console.log(2)}>
                        <View style={styles.itemContainer}>
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
                                           style={styles.nameInput}
                                           placeholder={tag.name}
                                           onChangeText={val => {
                                               this.editingNameTag = val
                                           }}/>
                            </View>

                        </MenuOption>
                        <MenuOption>

                            {this.createColorSliders(tag, this.changeTagColor.bind(this))}

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

                <Collapsible collapsed={tag.contentHidden}>



                </Collapsible>

            </View>

        )

    }

    generateDrill(drill, onPress){

        return(
            <Menu key={drill.name} onOpen={() => {
                this.editingNameTag = drill.name
            }} onClose={() => {
                this.changeDrillName(drill, this.editingNameTag);
                this.updateItemColor(drill, drill.color, 'drill');
            }}>

                <MenuTrigger triggerOnLongPress={true} onAlternativeAction={() => console.log(5)}>
                    <View style={styles.itemContainer}>

                        <FontAwesome name={'file'} size={24} color={drill.color} style={{alignSelf: 'center'}}
                                     onPress={() => onPress()}/>
                        <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{drill.name}</Text>

                    </View>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>

                        <View style={{padding: 15, flexDirection: 'row', flex: 1}}>
                            <Text style={{alignSelf: 'center', padding: 2, fontSize: 20}}>Name: </Text>
                            <TextInput ref={ref => {this.tagNameInput = ref}}
                                       style={styles.nameInput}
                                       placeholder={drill.name}
                                       onChangeText={val => {
                                           this.editingNameTag = val
                                       }}
                            />
                        </View>

                    </MenuOption>

                    <MenuOption>
                        {this.createColorSliders(drill, this.changeDrillColor.bind(this))}
                    </MenuOption>

                    <MenuOption >

                    </MenuOption>

                    <MenuOption onSelect={() => {
                        Alert.alert("Are you sure you want to delete this drill?",
                            "This action is not undoable", [
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        this.deleteDrill(drill);
                                    }
                                },
                                {
                                    text: 'Cancel'
                                }
                            ]);
                    }}>

                        <Text style={{fontSize: 20, color: 'red', padding: 20, alignSelf: 'center'}}>Delete Drill</Text>

                    </MenuOption>

                </MenuOptions>

            </Menu>
        );

    }

    deleteDrill = (drill) => {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.removeDrill(drill.name);
            const drills = this.state.drills;
            delete drills[drill.name];
            this.setState({drills: drills});
        })

    }

    deleteTag(tag){

        const tags = this.state.tags;
        delete tags[tag.name];
        this.setState({tags: tags});
        Edge.teams.get(GlobalData.teamID).then(team => {
            team.removeTag(tag.name);
        })

    }

    createColorSliders(tag, onChange){

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
                            onChange(tag, tinycolor(colorHsvOrRgb).toHexString())
                        }}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, flex: 1}}>
                    <SliderSaturationPicker
                        ref={view => {
                            this.sliderSaturationPicker = view;
                        }}
                        oldColor={tag.color}
                        trackStyle={[{height: 12, width: '100%'}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={(colorHsvOrRgb, resType) => {
                            onChange(tag, tinycolor(colorHsvOrRgb).toHexString())
                        }}
                        style={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: tinycolor({
                                h: tinycolor(tag.color).toHsv().h,
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


    exitDrillEditor(){

        Edge.teams.get(GlobalData.teamID)
            .then(team => {

            Alert.alert("Save Changes?", "", [
                {
                    text: "Save",
                    onPress: () => {

                        if(team.modules.drills.drills.hasOwnProperty(this.state.currentDrillEditing)){
                            team.addDrill(this.state.currentDrillEditing, this.state.currentDrillEditorContent);
                            this.setState({showModal: false});
                        }else{
                            this.setState({showDrillNameInput: true})
                        }
                    }
                },
                {
                    text: "Discard Changes",
                    onPress: () => {
                        this.setState({showModal: false});
                    }
                },
                {
                    text:"Cancel",
                    onPress: this.onTagNameCancel
                }
            ])

        })

    }

    handleTagNameChange = (name) => {
        this.setState({newTagName: name})
    }
    handleDrillNameChange = (name) => {
        this.setState({newDrillName: name})
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
            const drills = team.modules.drills?.drills || {};

            for(let [K, V] in drills){
                if(V && V.tags) {
                    const tags = V.tags;
                    for (let tag of tags) {
                        tags[tag].drills.push(K);
                    }
                }

            }

            this.setState({tags: tags, drills: drills});
        })

    }

    onTagNameCancel = () => {
        this.setState({showTagNameInput: false})
    }
    
    onEditorContentChange = (newContent) => {
        if(newContent.msg === "ON_CHANGE"){
            this.setState({currentDrillEditorContent: newContent.payload.html})
        }
    }

    onDrillNameCancel = () => {
        this.setState({showDrillNameInput: false})
    }

    addDrill = () => {
        const name = this.state.newDrillName;

        if(name) {
            Edge.teams.get(GlobalData.teamID).then(team => {

                if(!team.modules.drills.drills.hasOwnProperty(name)){

                    const drill = {
                        content: this.state.currentDrillEditorContent,
                        color: 'gold',
                        name: name
                    }
                    const drills = this.state.drills;
                    drills[drill.name] = drill;

                    team.addDrill(name, drill);
                    this.setState({drills: drills, showDrillNameInput: false, currentDrillEditorContent: null, showModal: false})

                }else{
                    Alert.alert("Invalid Drill", "This drill name already exists");
                }
            })
        }else{
            Alert.alert("Invalid Drill", "Please input a valid drill name");
        }

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

                            <InputText title={"Name this Drill!"} description={"What do you want this drill to be called?"}
                                       placeholder={"Drill Name"} onTextChange={this.handleDrillNameChange} onCancel={this.onDrillNameCancel}
                                       visible={this.state.showDrillNameInput} onSubmit={this.addDrill} onBackDropPress={this.onDrillNameCancel}
                                       />

                                      <NewDrill onContentChange={this.onEditorContentChange}/>

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
                    Object.entries(this.state.drills)?.map((i, j) => {

                        const content = i[1];
                        if(content){
                            content.name = i[0];
                            return this.generateDrill(content, () => console.log(5));
                        }
                    })
                }

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
