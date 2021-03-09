import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View, Dimensions} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import styles from "../../LoginRoutes/ProfileScreen/styles";
import {
    SliderHuePicker,
    SliderSaturationPicker,
    SliderValuePicker,
} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

class DrillsList extends Component {

    state = {
        drills:[],
    }

    constructor(props) {
        super(props);
        this.state = {
            drills:[]
        }
    }

    generateItem(itemType, name, key, onPress){
        const {
            width,
        } = Dimensions.get('window');
        return(

            <Menu key={key}>

                <MenuTrigger customStyles={{backgroundColor: 'red'}} triggerOnLongPress={true} onAlternativeAction={() => console.log(2)}>
                    <View style={{flexDirection: 'row', padding: 15,
                        borderBottomWidth: 2, borderTopWidth: 2, borderColor: 'grey'}}>
                        <FontAwesome name={itemType === 'folder' ? 'folder' : 'file'} size={24} color="gold" style={{alignSelf: 'center'}} onPress={() => onPress()}/>
                        <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{name}</Text>
                    </View>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>

                        <View style={{padding: 15, flexDirection: 'row', flex: 1}}>
                            <Text style={{alignSelf: 'center', padding: 2, fontSize: 20}}>Name: </Text>
                            <TextInput
                                style={{
                                    padding: 5,
                                    borderWidth: 2,
                                    borderColor: 'grey',
                                    flex: 1
                                }}
                            placeholder={name}
                            />
                        </View>

                    </MenuOption>
                    <MenuOption>

                        <View style={{marginHorizontal: 24, marginTop: 20, height: 12, flex: 1}}>
                            <SliderHuePicker
                                ref={view => {this.sliderHuePicker = view;}}
                                oldColor={'red'}
                                trackStyle={[{height: 12, width: '100%'}]}
                                thumbStyle={styles.thumb}
                                useNativeDriver={true}
                                onColorChange={(colorHsvOrRgb, resType) =>
                                    this.setState({color: tinycolor(colorHsvOrRgb).toHexString()})}
                            />
                        </View>
                        <View style={{marginHorizontal: 24, marginTop: 20, height: 12, flex: 1}}>
                            <SliderSaturationPicker
                                ref={view => {this.sliderSaturationPicker = view;}}
                                oldColor={this.state.color}
                                trackStyle={[{height: 12, width: '100%'}]}
                                thumbStyle={styles.thumb}
                                useNativeDriver={true}
                                onColorChange={this.changeColor}
                                style={{height: 12, borderRadius: 6, backgroundColor: tinycolor({h: tinycolor(this.state.color).toHsv().h, s: 1, v: 1}).toHexString()}}
                            />
                        </View>

                    </MenuOption>
                </MenuOptions>

            </Menu>


        )

    }

    createDrill(){




    }

    createFolder(name){

        let drills = this.state.drills;
        drills.push(
                {
                    content:[],
                    color: 'gold',
                    name: name
                }
        );

        this.setState({drills: drills});

    }

    addItem(){

        const options = ['Create Drill', 'Create Folder', 'Cancel'];
        const cancelButtonIndex = 2;
        const actionMap = {
            0: this.createDrill.bind(this),
            1: this.createFolder.bind(this),
        }

        this.props.showActionSheetWithOptions({
                options, cancelButtonIndex
            },
            buttonIndex => {
                if (actionMap[buttonIndex] != null) actionMap[buttonIndex]("hello");
            })

    }


    render() {
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
                    this.state.drills.map((i, j) => {
                        const itemType = i.hasOwnProperty('content') ? 'folder' : 'file';
                        const name = i.name;
                        return this.generateItem(itemType, name, j, () => console.log(1))
                    })
                }

                <NewButton onPress={() => this.addItem()}/>{/*TODO: check for coach before displaying this*/}

            </View>
        );
    }
}

const DrillsListApp = connectActionSheet(DrillsList);
export default DrillsListApp;
