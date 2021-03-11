import React, {Component} from 'react';
import {Dimensions, Text, TextInput, View, Alert} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import styles from "../../LoginRoutes/ProfileScreen/styles";
import {SliderHuePicker, SliderSaturationPicker,} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import {createUUID} from "../../../firebase/Util";

class DrillsList extends Component {

    state = {
        drills: [],
    }
    editingNameTag = "";
    tagEditColor = null;

    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            drills: {}
        }
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
        const {
            width,
        } = Dimensions.get('window');

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
                        Alert.alert("Are you sure you want to delete this tag?", "This will not remove any drills under it", [
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

    createDrill(tag) {

        let drills = this.state.drills;
        drills[createUUID('xxxxx')] = {
            tags: []
        }


    }

    createTag(name) {

        let tags = this.state.tags;
        tags[name] = {
            color: 'gold',
            name: name,
            contentHidden: true
        }

        this.setState({tags: tags});

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

    render() {
        const displayedTags = [];
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

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
                        content.name = name;
                        return this.generateTag(content, () => console.log(1));

                    })
                }

                <NewButton onPress={() => this.addItem()}/>{/*TODO: check for coach before displaying this*/}

            </View>
        );
    }
}

const DrillsListApp = connectActionSheet(DrillsList);
export default DrillsListApp;
