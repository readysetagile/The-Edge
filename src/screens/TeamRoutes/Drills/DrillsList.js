import React, {Component} from 'react';
import {
    Alert,
    Keyboard,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {SliderHuePicker, SliderSaturationPicker,} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import NewDrill from "./NewDrill";
import GlobalData from '../../../GlobalData';
import Edge from "../../../firebase/index";
import InputText from "../../../Components/InputText";
import Collapsible from "react-native-collapsible";
import styles from './styles';
import CheckBox from "react-native-check-box";

class DrillsList extends Component {

    state = {
        tags: {},
        drills: {},
        showModal: false,
        showTagNameInput: false,
        showDrillNameInput: false,
        newDrillName: null,
        currentDrillEditorContent: null,
        currentDrillEditing: null,
        canEditDrills: false
    }
    editingNameTag = "";
    tagEditColor = null;
    currentDrillEditorContent = null

    constructor(props) {
        super(props);

    }

    updateDrillTags(drills, oldTagName, newTagName){

        if(Array.isArray(drills)) {
            const stateDrills = this.state.drills, stateTags = this.state.tags;

            for (const drill of drills) {
                const drillObj = stateDrills[drill];
                drillObj.tags = stateDrills[drill].tags.filter(i => i !== oldTagName)
                drillObj.tags.push(newTagName);
                stateDrills[drill] = drillObj;

                // stateTags[newTagName].contentHidden = true;
                // if (stateTags[newTagName].drills) {
                //     stateTags[newTagName].drills.push(drill);
                // } else stateTags[newTagName].drills = [drill];
                // console.log(stateTags[newTagName]);

                this.updateDrill(stateDrills[drill]);

            }
            this.setState({drills: stateDrills});
        }

    }

    changeTagName(tag, newName) {

        if (newName && tag.name !== newName) {
            const tags = this.state.tags;
            const oldName = tag.name;
            const oldTagDrills = tag.drills;

            delete tags[tag.name];
            Edge.teams.get(GlobalData.teamID).then(team => {
                team.removeTag(oldName);
                team.addTag(newName, tag);

                tags[newName] = tag;
                tags[newName].drills = oldTagDrills;

                this.updateDrillTags(oldTagDrills, oldName, newName);
                this.setState({tags: tags});
                this.componentDidMount();
                this.editingNameTag = ""
            });

        }
    }

    updateTagDrills(drill, newDrillName){

        const tags = this.state.tags;
        const tagsToUpdate = drill.tags;

        if(tagsToUpdate) {
            for (const tag of tagsToUpdate) {

                let drills = tags[tag].drills;
                console.log(drills, 1);
                drills = drills.filter(i => i !== drill.name);
                drills.push(newDrillName);
                console.log(drills, 1);

            }

            this.setState({tags: tags});
        }

    }

    changeDrillName(drill, newName) {
        if (newName && drill.name !== newName) {

            const drills = this.state.drills;


            Edge.teams.get(GlobalData.teamID).then(team => {
                this.updateTagDrills(drill, newName);
                delete drills[drill.name];

                team.removeDrill(drill.name);
                drill.name = newName;

                team.addDrill(newName, drill);
                drills[newName] = drill;
                this.setState({drills: drills});
                this.componentDidMount();
            })
            this.editingNameTag = ""
        }

    }

    changeTagColor(tag, newColor) {
        if (newColor && tag.color !== newColor) {
            this.state.tags[tag.name].color = newColor;
            this.setState({
                tags: this.state.tags
            })
        }
    }

    changeDrillColor(drill, newColor) {

        if (newColor && drill.color !== newColor) {
            this.state.drills[drill.name].color = newColor;
            this.setState({
                drills: this.state.drills
            })
        }

    }

    updateDrill(drill){

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.addDrill(drill.name, drill);
        })

    }

    updateItemColor(item, color, type) {

            Edge.teams.get(GlobalData.teamID).then(team => {
                item.color = color;
                if (type === 'tag') {
                    const isContentHidden = item.contentHidden;
                    item.contentHidden = null;
                    team.addTag(item.name, item);
                    item.contentHidden = isContentHidden;
                }
                else team.addDrill(item.name, item);
            })

    }

    invertTagHiddenContent(tag) {

        const tags = this.state.tags;
        tag.contentHidden = !tag.contentHidden;
        tags[tag.name].contentHidden = tag.contentHidden;
        this.setState({tags: tags})

    }

    generateTag(tag) {

        return (

            <View key={tag.name}>

                {this.generateTagViewing(tag)}

                <Collapsible collapsed={tag.contentHidden}>

                    {
                        tag.drills?.map(name => {
                            console.log(tag.drills);
                            return this.generateDrill(this.state.drills[name])
                        })
                    }

                </Collapsible>

            </View>

        )

    }

    generateTagViewing(tag) {

        return this.state.canEditDrills ? this.generateTagMenu(tag) : (
            <TouchableOpacity onPress={this.invertTagHiddenContent.bind(this, tag)}>
                {this.generateTagView(tag)}
            </TouchableOpacity>
        )

    }

    generateTagView(tag) {

        return (
            <View style={styles.itemContainer}>
                <FontAwesome name={'tag'} size={24} color={tag.color} style={{alignSelf: 'center'}}/>
                <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{tag.name}</Text>

                <View style={{flex: 1}}>
                    <MaterialIcons name={tag.contentHidden ? 'arrow-drop-up' : 'arrow-drop-down'}
                                   size={30} color={'grey'} style={{alignSelf: 'flex-end'}}/>
                </View>

            </View>
        )

    }

    generateTagMenu(tag) {

        return (

            <Menu onOpen={() => {
                this.editingNameTag = tag.name
                this.tagEditColor = tag.color;
            }} onClose={() => {
                this.changeTagName(tag, this.editingNameTag)
                this.updateItemColor(tag, tag.color, 'tag');
            }}>

                <MenuTrigger triggerOnLongPress={true}
                             onAlternativeAction={this.invertTagHiddenContent.bind(this, tag)}>

                    {this.generateTagView(tag)}

                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>

                        <View style={{padding: 15, flexDirection: 'row', flex: 1}}>
                            <Text style={{alignSelf: 'center', padding: 2, fontSize: 20}}>Name: </Text>
                            <TextInput ref={ref => {
                                this.tagNameInput = ref
                            }}
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

                        <Text style={{fontSize: 20, color: 'red', padding: 20, alignSelf: 'center'}}>Delete
                            Tag</Text>

                    </MenuOption>

                </MenuOptions>

            </Menu>


        )

    }

    setDrillViewing(drill) {

        this.setState({currentDrillEditing: drill.name, showModal: true});

    }

    generateDrill(drill) {

        if(drill) {
            return this.state.canEditDrills ? this.generateDrillMenu(drill) : (
                <TouchableOpacity onPress={() => this.setDrillViewing(drill)} key={drill.name}>
                    {this.generateDillView(drill)}
                </TouchableOpacity>

            )
        } else return null;
    }

    generateDillView(drill) {
        return (
            <View style={styles.itemContainer} key={drill.name} onPress={() => this.setDrillViewing(drill)}>
                <FontAwesome name={'file'} size={24} color={drill.color} style={{alignSelf: 'center'}}/>
                <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{drill.name}</Text>
            </View>

        )
    }

    generateDrillMenu(drill) {

        return (
            <Menu key={drill.name} onOpen={() => {
                this.editingNameTag = drill.name
            }} onClose={() => {
                this.changeDrillName(drill, this.editingNameTag);
                this.updateItemColor(drill, drill.color, 'drill');
            }}>

                <MenuTrigger triggerOnLongPress={true} onAlternativeAction={this.setDrillViewing.bind(this, drill)}>
                    {this.generateDillView(drill)}
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>

                        <View style={{padding: 15, flexDirection: 'row', flex: 1}}>
                            <Text style={{alignSelf: 'center', padding: 2, fontSize: 20}}>Name: </Text>
                            <TextInput ref={ref => {
                                this.tagNameInput = ref
                            }}
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

                    <MenuOption disableTouchable={true}>

                        <Text style={{fontSize: 15, color: 'grey', fontWeight: 'bold'}}>Tags:</Text>

                        <View style={{height: 100}}>

                            <ScrollView style={{padding: 5}}>

                                {this.generateDrillTags(drill)}

                            </ScrollView>

                        </View>

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

    generateDrillTags(drill) {

        const tags = [];

        Object.entries(this.state.tags).forEach(i => {

            if (i && i[1]) {
                const content = i[1];

                const view = this.generateDrillTag(drill, content);
                tags.push(view);

            }

        });

        return tags;
    }

    generateDrillTag(drill, tagContent) {

        return (

            <View key={tagContent.name} style={
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>

                <Text style={{
                    borderWidth: 2,
                    borderColor: tagContent.color,
                    borderRadius: 5,
                    padding: 3,
                    marginTop: 3
                }}>{tagContent.name}:</Text>
                <CheckBox checkBoxColor={tagContent.color}
                          col
                          isChecked={drill.tags?.includes(tagContent.name)}
                          onClick={() => this.toggleTag(drill, tagContent.name)}/>

            </View>

        )

    }

    toggleTag(drill, tagName) {

        if (drill.tags) {
            const tags = this.state.tags;

            if (drill.tags.includes(tagName)) {
                drill.tags = drill.tags.filter(i => i !== tagName);
                tags[tagName].drills = tags[tagName].drills.filter(i => i !== drill.name);
            } else {
                drill.tags.push(tagName);
                if (tags[tagName].drills) {
                    tags[tagName].drills.push(drill.name);
                } else tags[tagName].drills = [drill.name];

            }

            const drills = this.state.drills;
            drills[drill.name] = drill;
            this.setState({drills: drills, tags: tags});
        } else {
            drill.tags = []
            this.toggleTag(drill, tagName);
        }
    }

    deleteDrill = (drill) => {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.removeDrill(drill.name);
            const drills = this.state.drills;
            delete drills[drill.name];
            this.setState({drills: drills});
        })

    }

    deleteTag(tag) {

        const tags = this.state.tags;
        delete tags[tag.name];
        this.setState({tags: tags});
        Edge.teams.get(GlobalData.teamID).then(team => {
            team.removeTag(tag.name);
        })

    }

    createColorSliders(tag, onChange) {

        return (
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


    exitDrillEditor() {

        Edge.teams.get(GlobalData.teamID)
            .then(team => {

                Alert.alert("Save Changes?", "", [
                    {
                        text: "Save",
                        onPress: () => {

                            this.setState({currentDrillEditorContent: this.currentDrillEditorContent})
                            if (team.modules.drills.drills.hasOwnProperty(this.state.currentDrillEditing)) {
                                team.addDrill(this.state.currentDrillEditing, this.state.currentDrillEditorContent);
                                this.setState({showModal: false});
                            } else {
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
                        text: "Cancel",
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

        if (!name) {
            Alert.alert("Invalid Tag Name", "Please input a tag name");
            return;
        } else if (tags.hasOwnProperty(name)) {
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

        this.memberHasPermissionToEditDrills().then((editable) => {
            this.setState({canEditDrills: editable})
        })

        Edge.teams.get(GlobalData.teamID).then(team => {

            const allTags = Object.assign({}, team.modules.drills?.tags || {});
            const drills = team.modules.drills?.drills || {};

            Object.entries(drills).forEach(i => {
                if (i[1]) {
                    const name = i[0];
                    const content = i[1];

                    const tags = content.tags;//drill tags
                    if (tags) {

                        for (const tag of tags) {

                            const currentTag = allTags[tag];
                            if (currentTag) {

                                if (currentTag.drills) {
                                    if (!currentTag.drills.includes(name))
                                        currentTag.drills.push(name);
                                } else {
                                    currentTag.drills = [name];
                                }

                            } else {
                                team.removeTagFromDrill(name, tag);
                            }

                        }

                    }
                    if (content.tags){
                        const drill = drills[i[0]]
                        drill.tags = Object.values(content.tags);
                        drills[i[0]] = drill;
                    }

                }
            })

            this.setState({tags: allTags, drills: drills});
        })

    }

    onTagNameCancel = () => {
        this.setState({showTagNameInput: false})
    }

    onEditorContentChange = (newContent) => {
        if (newContent.msg === "ON_CHANGE") {
            this.currentDrillEditorContent = newContent.payload.html;
        }
    }

    onDrillNameCancel = () => {
        this.setState({showDrillNameInput: false})
    }

    addDrill = () => {
        const name = this.state.newDrillName;

        if (name) {
            Edge.teams.get(GlobalData.teamID).then(team => {

                if (!team.modules.drills.drills.hasOwnProperty(name)) {

                    const drill = {
                        content: this.state.currentDrillEditorContent,
                        color: 'gold',
                        name: name
                    }
                    const drills = this.state.drills;
                    drills[drill.name] = drill;

                    team.addDrill(name, drill);
                    this.setState({
                        drills: drills,
                        showDrillNameInput: false,
                        currentDrillEditorContent: null,
                        showModal: false
                    })

                } else {
                    Alert.alert("Invalid Drill", "This drill name already exists");
                }
            })
        } else {
            Alert.alert("Invalid Drill", "Please input a valid drill name");
        }

    }

    createDrillHeader(drillName) {

        const content = this.state.drills[drillName]?.content
        const canEdit = this.state.canEditDrills;

        return (

            <View style={globalStyles.modalContent}>

                {
                    canEdit ? (
                            <View>
                                <Ionicons style={{...globalStyles.closeModal(3), padding: 15}}
                                          name={"checkmark-circle-outline"} size={24}
                                          onPress={() => this.exitDrillEditor()}/>

                                <InputText title={"Name this Drill!"}
                                           description={"What do you want this drill to be called?"}
                                           placeholder={"Drill Name"} onTextChange={this.handleDrillNameChange}
                                           onCancel={this.onDrillNameCancel}
                                           visible={this.state.showDrillNameInput} onSubmit={this.addDrill}
                                           onBackDropPress={this.onDrillNameCancel}
                                />
                            </View>
                        ) :
                        <Ionicons style={{...globalStyles.closeModal(3), padding: 15}}
                                  name={"close"} size={24}
                                  onPress={() => this.setState({showModal: false})}/>
                }

                <NewDrill onContentChange={this.onEditorContentChange} isReadOnly={!canEdit} content={content}/>


            </View>

        )

    }

    memberHasPermissionToEditDrills() {

        return new Promise(resolve => {

            Edge.teams.get(GlobalData.teamID).then(r => {
                r.getMember(GlobalData.profileID).then(member => {
                    resolve(member.permissions.has("editDrills") || member.permissions.has("isCoach"));
                })
            })

        });

    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <InputText title={"Name this Tag!"} description={"What do you want this tag to be called?"}
                           placeholder={"Tag Name"} onTextChange={this.handleTagNameChange}
                           onCancel={this.onTagNameCancel}
                           visible={this.state.showTagNameInput} onSubmit={this.addTag}
                           onBackDropPress={this.onTagNameCancel}/>


                <Modal visible={this.state.showModal} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {this.createDrillHeader(this.state.currentDrillEditing)}
                    </TouchableWithoutFeedback>
                </Modal>

                <View style={globalStyles.topToolBar}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Total Drills: 0</Text>
                    <View style={globalStyles.searchToolBar}>
                        <TextInput
                            placeholderTextColor={'#003f5c'}
                            placeholder='Search :mag_right:'
                            onChangeText={(val) => {
                            }}>
                        </TextInput>
                    </View>
                </View>

                {
                    Object.entries(this.state.drills)?.map(i => {

                        const content = i[1];
                        if (content && (!Array.isArray(content.tags) || content.tags.length === 0)) {
                            return this.generateDrill(content);
                        }
                    })
                }

                {

                    Object.entries(this.state.tags).map(i => {

                        const name = i[0];
                        const content = i[1];
                        if (content) {
                            content.name = name;
                            return this.generateTag(content);
                        }
                    })

                }

                {
                    this.state.canEditDrills ? <NewButton onPress={() => this.addItem()}/> : <View/>
                }

            </View>
        );
    }
}

const DrillsListApp = connectActionSheet(DrillsList);
export default DrillsListApp;
