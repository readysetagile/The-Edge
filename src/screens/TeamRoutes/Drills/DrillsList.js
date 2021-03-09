import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {ScrollView} from "react-native-web";


class DrillsList extends Component {

    state = {
        drills:[]
    }

    constructor(props) {
        super(props);
        this.state = {
            drills:[]
        }
    }

    generateItem(itemType, name, key, onPress){

        return(

            <TouchableOpacity style={{flexDirection: 'row', padding: 15,
                borderBottomWidth: 2, borderTopWidth: 2, borderColor: 'grey'}} key={key}>

                <FontAwesome name={itemType === 'folder' ? 'folder' : 'file'} size={24} color="gold" style={{alignSelf: 'center'}} onPress={() => onPress()}/>
                <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{name}</Text>

            </TouchableOpacity>

        )

    }

    createDrill(){




    }

    createFolder(name){

        let drills = this.state.drills;
        drills.push(
                {
                    content:[],
                    ['color']: 'gold',
                    ['name']: name
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
                        const name = i[Symbol.for('name')]
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
