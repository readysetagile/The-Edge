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
import FlatButton from "../../../Components/SubmitButton";
import {Drill} from "../../../firebase/modules/Drills";
import Expo from "expo-server-sdk";
import {firebase} from '../../../firebase/config'

class DrillsList extends Component {

    state = {
        tags: {},
        drills: {},
        assignedDrills: [],
        showModal: false,
        showTagNameInput: false,
        showDrillNameInput: false,
        memberToAssign: null,
        newDrillName: null,
        currentDrillEditorContent: null,
        currentDrillEditing: null,
        canEditDrills: false,
        isAssigning: false,
    }

    editingNameTag = "";
    tagEditColor = null;
    currentDrillEditorContent = null

    constructor(props) {
        super(props);

    }

    /**
     * Updates each drills tags to be renamed to the tag that has been renamed
     *
     * Goes through each drill that was passed in to replace the oldTagName with the newTagName in order to
     * move the drill location to the desired location
     *
     * @param drills the drills to update
     * @param oldTagName the old tag name to change
     * @param newTagName the new tag name to change to
     */
    updateDrillTags(drills, oldTagName, newTagName) {

        if (Array.isArray(drills)) {
            const stateDrills = this.state.drills

            for (const drill of drills) {
                const drillObj = stateDrills[drill];
                drillObj.tags = stateDrills[drill].tags.filter(i => i !== oldTagName)
                drillObj.tags.push(newTagName);
                stateDrills[drill] = drillObj;

                this.updateDrill(stateDrills[drill]);

            }
            this.setState({drills: stateDrills});
        }

    }

    /**
     * Changes the tag name
     * @param tag the tag to change the name of
     * @param newName the new name of the tag
     */
    changeTagName(tag, newName) {

        if (newName && tag.name !== newName) {
            const tags = this.state.tags;

            if (tags[newName] != null) {
                Alert.alert("Invalid Name", "This tag name already exists")
                return;
            }

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

    /**
     * Updates the tags of a certain drill to add the new drill name to it and remove its current old drill name
     * @param drill the drill to update
     * @param newDrillName the new name of the drill to update each tag's drills to contain the new drill name
     */
    updateTagDrills(drill, newDrillName) {

        const tags = this.state.tags;
        const tagsToUpdate = drill.tags;

        if (tagsToUpdate) {
            for (const tag of tagsToUpdate) {

                let drills = tags[tag].drills;
                drills = drills.filter(i => i !== drill.name);
                drills.push(newDrillName);

            }

            this.setState({tags: tags});
        }

    }

    /**
     * Changes a drill's name
     * @param drill the drill to change the name of
     * @param newName the new name of the drill
     */
    changeDrillName(drill, newName) {
        if (newName && drill.name !== newName) {

            const drills = this.state.drills;

            if (drills[newName] != null) {
                Alert.alert("Invalid Name", "This tag name already exists")
                return;
            }

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

    /**
     * Changes a tags color
     * @param tag the tag to change
     * @param newColor the new color of the tag
     */
    changeTagColor(tag, newColor) {
        if (newColor && tag.color !== newColor) {
            this.state.tags[tag.name].color = newColor;
            this.setState({
                tags: this.state.tags
            })
        }
    }

    /**
     * Changes a drills color
     * @param drill the drill to change
     * @param newColor the new color of the drill
     */
    changeDrillColor(drill, newColor) {

        if (newColor && drill.color !== newColor) {
            this.colorDidChange = true;
            this.state.drills[drill.name].color = newColor;
            this.setState({
                drills: this.state.drills
            })
        }

    }

    /**
     * Updates a drill in the firebase
     * @param drill the drill to update
     */
    updateDrill(drill) {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.addDrill(drill.name, drill);
        })

    }

    /**
     * Updates any items color in the database
     * @param item the item to update
     * @param color the color to change the item to
     * @param type the type of the item (tag | drill)
     */
    updateItemColor(item, color, type) {

        Edge.teams.get(GlobalData.teamID).then(team => {
            item.color = color;
            if (type === 'tag') {
                const isContentHidden = item.contentHidden;
                item.contentHidden = null;
                team.addTag(item.name, item);
                item.contentHidden = isContentHidden;
            } else team.addDrill(item.name, item);
        })

    }

    /**
     * Toggles wether or not to see what is under a tag
     *
     * This shows the drills that the clicked tag contains
     *
     * @param tag the tag clicked to toggle
     */
    invertTagHiddenContent(tag) {

        const tags = this.state.tags;
        tag.contentHidden = !tag.contentHidden;
        tags[tag.name].contentHidden = tag.contentHidden;
        this.setState({tags: tags})

    }

    /**
     * Generates how a tag looks
     * @param tag the data of a tag
     * @returns {JSX.Element}
     */
    generateTag(tag) {

        return (

            <View key={tag.name}>

                {this.generateTagViewing(tag)}

                <Collapsible collapsed={tag.contentHidden}>

                    {
                        tag.drills?.map(name => {
                            return this.generateDrill(this.state.drills[name])
                        })
                    }

                </Collapsible>

            </View>

        )

    }

    /**
     * determines if a tag should be able to be held onto based on a users permission
     * @param tag the tag to generate
     * @returns {*|JSX.Element}
     */
    generateTagViewing(tag) {

        return this.state.canEditDrills ? this.generateTagMenu(tag) : (
            <TouchableOpacity onPress={this.invertTagHiddenContent.bind(this, tag)}>
                {this.generateTagView(tag)}
            </TouchableOpacity>
        )

    }

    /**
     * The face value of a tag (what anyone sees)
     * @param tag the tag data
     * @returns {JSX.Element}
     */
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

    /**
     * Generates a tag menu to be able to change, update and remove a tag
     * @param tag the data of a tag
     * @returns {JSX.Element}
     */
    generateTagMenu(tag) {

        return (

            <Menu onOpen={() => {
                this.editingNameTag = tag.name
                this.tagEditColor = tag.color;
            }} onClose={() => {
                this.changeTagName(tag, this.editingNameTag)
                if (this.colorDidChange)
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

    /**
     * Toggles if you are viewing the contents of a drill
     * @param drill the drill data
     */
    setDrillViewing(drill) {
        this.setState({currentDrillEditing: drill.name, showModal: true});
    }

    /**
     * Determines if a drill is able to be held onto for a menu based on the users permissions
     * @param drill
     * @returns {null|*|JSX.Element}
     */
    generateDrill(drill) {

        if (drill) {

            if(!this.state.isAssigning && this.state.canEditDrills){
                return this.generateDrillMenu(drill);
            }else if(this.state.isAssigning){
                return this.clickDrillContent(drill);

            }else{
                return (
                    <TouchableOpacity onPress={() => this.setDrillViewing(drill)} key={drill.name}>
                        {this.generateDillView(drill)}
                    </TouchableOpacity>
                )
            }

        } else return null;
    }

    /**
     * Toggles if a drill is assigned
     * @param drill the drill to assign
     */
    toggleDrillToAssign(drill){

        let assignedDrills = this.state.assignedDrills;
        if(!assignedDrills.includes(drill.name))
            assignedDrills.push(drill.name);
        else assignedDrills = assignedDrills.filter(i => i !== drill.name);

        this.setState({assignedDrills: assignedDrills});
    }

    clickDrillContent(drill){

        const style = {
            ...styles.itemContainer
        }
        if(this.state.assignedDrills.includes(drill.name)){
            style['backgroundColor'] = '#bada55'
        }

        return(
            <TouchableOpacity onPress={this.toggleDrillToAssign.bind(this, drill)} key={drill.name}>

                <View style={style}>

                    <FontAwesome name={'file'} size={24} color={drill.color} style={{alignSelf: 'center'}}/>
                    <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{drill.name}</Text>

                </View>

            </TouchableOpacity>
        )

    }

    /**
     * Generates what anyone sees about a drill
     * @param drill
     * @returns {JSX.Element}
     */
    generateDillView(drill) {
        return (
            <View style={styles.itemContainer} key={drill.name} onPress={() => this.setDrillViewing(drill)}>
                <FontAwesome name={'file'} size={24} color={drill.color} style={{alignSelf: 'center'}}/>
                <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{drill.name}</Text>
            </View>

        )
    }

    /**
     * Generates the drills menu in order to change, delete, and update a drill
     * @param drill the drill data
     * @returns {JSX.Element}
     */
    generateDrillMenu(drill) {

        return (
            <Menu key={drill.name} onOpen={() => {
                this.editingNameTag = drill.name
            }} onClose={() => {
                this.changeDrillName(drill, this.editingNameTag);
                //if (this.colorDidChange)
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

                        {Object.keys(this.state.tags).length - 1 ?
                            <View>

                                <Text style={{fontSize: 15, color: 'grey', fontWeight: 'bold'}}>Tags:</Text>

                                <View style={{height: 100}}>

                                    <ScrollView style={{padding: 5}}>

                                        {this.generateDrillTags(drill)}

                                    </ScrollView>

                                </View>

                            </View> : null
                        }

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

    /**
     * Generates all the tags to be added in a list of toggleable checkmarks so that a drill can be
     * put into a tag
     * @param drill the drill data
     * @returns {[]} a list of tags the drill has enabled
     */
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

    /**
     * Generates the view of a togglable checkmark so that the user can click on it and a drill be added to a tag
     * @param drill the drill in question (its data)
     * @param tagContent the data of a tag
     * @returns {JSX.Element}
     */
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

    /**
     * Adds or removes a tag from a drill and also updates the tag
     * @param drill the drill to add or remove a tag name from
     * @param tagName the tag name to add or remove from the drill
     */
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

    /**
     * Deletes a drill from the database and state
     * @param drill the drill to delete
     */
    deleteDrill = (drill) => {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.removeDrill(drill.name);
            const drills = this.state.drills;
            delete drills[drill.name];
            this.setState({drills: drills});
        })

    }

    /**
     * Deletes a tag from the database and state
     * @param tag the tag to delete
     */

    deleteTag(tag) {

        const tags = this.state.tags, drills = this.state.drills;
        Edge.teams.get(GlobalData.teamID).then(team => {

            if (tag.drills) {

                const tagDrills = tag.drills;
                for (const drill of tagDrills) {

                    const stateDrill = drills[drill];
                    stateDrill.tags = stateDrill.tags.filter(i => i !== tag.name);
                    drills[drill] = stateDrill;
                    team.addDrill(stateDrill.name, stateDrill);

                }
            }
            delete tags[tag.name];
            this.setState({tags: tags, drills});
            team.removeTag(tag.name);
        })

    }

    /**
     * Creates 2 color sliders so that a drill or tag can have their colors modified
     * @param item the item to change the color of
     * @param onChange what happens when a color changes
     * @returns {JSX.Element}
     */
    createColorSliders(item, onChange) {

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
                            onChange(item, tinycolor(colorHsvOrRgb).toHexString())
                        }}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, flex: 1}}>
                    <SliderSaturationPicker
                        ref={view => {
                            this.sliderSaturationPicker = view;
                        }}
                        oldColor={item.color}
                        trackStyle={[{height: 12, width: '100%'}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={(colorHsvOrRgb, resType) => {
                            onChange(item, tinycolor(colorHsvOrRgb).toHexString())
                        }}
                        style={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: tinycolor({
                                h: tinycolor(item.color).toHsv().h,
                                s: 1,
                                v: 1
                            }).toHexString()
                        }}
                    />
                </View>

            </View>
        )

    }

    /**
     * Prompts the user to create a new drill by showing them the editor
     */
    createDrill() {

        this.setState({showModal: true});

    }

    /**
     * Creates a new tag by prompting the user to add a new tag
     */
    createTag = () => {
        this.setState({showTagNameInput: true});
    }

    /**
     * Shows a popup view of which item to create
     */
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


    /**
     * Removes the user from the drill editor
     */
    exitDrillEditor() {

        Edge.teams.get(GlobalData.teamID)
            .then(team => {

                Alert.alert("Save Changes?", "", [
                    {
                        text: "Save",
                        onPress: () => {

                            this.setState({currentDrillEditorContent: this.currentDrillEditorContent})

                            if (team.modules.drills.drills.hasOwnProperty(this.state.currentDrillEditing)) {

                                if (this.state.currentDrillEditorContent !== this.state.drills[this.state.currentDrillEditing]) {
                                    this.state.drills[this.state.currentDrillEditing].content = this.state.currentDrillEditorContent;
                                    team.addDrill(this.state.currentDrillEditing, this.state.drills[this.state.currentDrillEditing]);
                                }
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

    /**
     * Creates a new tag by prompting the user for a name
     */
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
            name: name
        }
        Edge.teams.get(GlobalData.teamID).then(team => {
            team.addTag(name, tags[name]);
        })

        tags[name].contentHidden = true;
        this.setState({showTagNameInput: false, tags: tags, newTagName: ""});

    }

    /**
     * Sets up each tag to contain a drill in the state.
     */
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

                    let tags = content.tags;//drill tags
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
                                tags = tags.filter(i => i.name !== tag.name);
                                team.removeTagFromDrill(name, tag);
                            }

                        }

                    }
                    if (content.tags) {
                        const drill = drills[i[0]]
                        drill.tags = Object.values(content.tags);
                        drills[i[0]] = drill;
                    }

                }
            })

            this.setState({tags: allTags, drills: drills});
        })

        this.focusListener = this.props.navigation.addListener('didFocus', payload => {
            this.setState({
                isAssigning: payload?.action?.params?.isAssigning,
                memberToAssign: payload?.action?.params?.memberToAssign
            });
        })
    }

    componentWillUnmount() {
        this.focusListener?.remove();
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

    /**
     * Creates a new drill when the user sets a new drill name for the first time
     */
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

    /**
     * Shows the header for the drill editor
     * @param drillName the drill name to create a header for
     * @returns {JSX.Element}
     */
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

    /**
     * Detects if a user has permissions to edit drills
     * @returns {Promise<boolean>} if the user has permissions to edit a drill
     */
    memberHasPermissionToEditDrills() {

        return new Promise(resolve => {
            Edge.teams.get(GlobalData.teamID).then(r => {
                r.getMember(GlobalData.profileID).then(member => {
                    resolve(member.permissions.has("editDrills") || member.permissions.has("isCoach"));
                })
            })

        });

    }

    /**
     * Gets the jsx elements to input a tag name and the drill creation element
     * @param isAssigning if the user is currently assigning drills to members
     * @returns {JSX.Element|null} the element to be given
     */
    getContentUI(isAssigning) {

        return !isAssigning ?
            <View>

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

            </View> : null
    }

    removeAssignedDrill(drillName) {

        let assignedDrills = this.state.assignedDrills;
        assignedDrills = assignedDrills.filter(i => i !== drillName);
        this.setState({assignedDrills: assignedDrills})

    }

    getAssignedDrills(){

        return this.state.assignedDrills.map(drillName => {

            return (

                <View key={drillName} style={{
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: this.state.drills[drillName].color,
                    flexDirection: 'row',
                    alignItems:'center',
                    margin: 5,
                }}>

                    <Text style={{
                        textAlign: 'center',
                        fontSize: 15,
                        padding: 5,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>{drillName}</Text>

                    <Ionicons name={'close'} size={20} color={'red'} onPress={this.removeAssignedDrill.bind(this, drillName)}/>

                </View>

            )

        })

    }

    getToolBarContent(isAssigning){

        return !isAssigning ?
            <View style={globalStyles.topToolBar}>
            <Text style={{alignSelf: 'center', fontSize: 20}}>Total
                Drills: {Object.keys(this.state.drills).length - 1}</Text>
            <Text style={{alignSelf: 'center', fontSize: 20}}>Total
                Tags: {Object.keys(this.state.tags).length - 1}</Text>
        </View>
            : <View style={{...globalStyles.topToolBar,
                backgroundColor: '#89cff0',
                justifyContent: 'space-equally', flexWrap: 'wrap'
            }}>

                {this.getAssignedDrills()}

            </View>

    }

    receiveDrills(){

        const expo = new Expo();

        const member = this.state.memberToAssign;

        firebase.database().ref("Devices").child(member.accountID).once('value', res => {

            const value = res.val()?.pushTokens
            if (value && Array.isArray(value)) {

                Edge.teams.get(GlobalData.teamID).then(team => {

                    const notificationData = [{
                        to: value,
                        sound: 'default',
                        title: 'Drills Assigned in ' + team.teamName,
                        body: `${member.username} has been assigned new drills!`,
                    }]

                    const chunks = expo.chunkPushNotifications(notificationData);
                    for (const chunk of chunks) {
                        expo.sendPushNotificationsAsync(chunk).catch(console.error);
                    }

                })

            }

        });

    }

    newDrill(drillName){

        return Drill.createDrill(GlobalData.teamID, GlobalData.profileID, this.state.memberToAssign, drillName);

    }

    sendDrills(){

        const member = this.state.memberToAssign;
        for(const drill of this.state.assignedDrills){
            if(!member.assignedDrills || !Object.values(member.assignedDrills).some(aDrill => aDrill.drillName === drill))
                member.addAssignedDrill(this.newDrill(drill));
        }
        this.receiveDrills();

        this.props.navigation.navigate("Members");

    }

    confirmSend(){

        Alert.alert("Assign Drills", "Are you sure you want to assign these drills?", [
            {
                text: 'Yes',
                onPress: this.sendDrills.bind(this)
            },
            {
                text: "No"
            }
        ])

    }

    render() {

        const isAssigning = this.state.isAssigning;

        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                {this.getContentUI(isAssigning)}
                {this.getToolBarContent(isAssigning)}

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
                    (!isAssigning && this.state.canEditDrills) ?
                        <NewButton onPress={() => this.addItem()}/> :
                        isAssigning ?
                        (
                            <FlatButton text={"SEND!"} style={{
                                position: 'absolute',
                                bottom: 30,
                                width: '90%',
                                alignSelf: 'center'
                            }} onPress={this.confirmSend.bind(this)}/>
                        ) : null
                }

            </View>
        );
    }
}

const DrillsListApp = connectActionSheet(DrillsList);
export default DrillsListApp;
