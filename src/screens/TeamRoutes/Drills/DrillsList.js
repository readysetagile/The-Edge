import React, {Component} from 'react';
import {Text, TextInput, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";
import {connectActionSheet} from '@expo/react-native-action-sheet'


class DrillsList extends Component {

    constructor(props) {
        super(props);
    }

    generateItem(itemType, name, onPress){

        return(

            <View style={{flexDirection: 'row', padding: 20,
                borderBottomWidth: 2, borderTopWidth: 2, borderColor: 'grey'}}>



            </View>

        )

    }

    createDrill(){



    }

    createFolder(){



    }

    addItem(){

        const options = ['Create Drill', 'Create Folder', 'Cancel'];
        const cancelButtonIndex = 2;
        const actionMap = {
            0: this.createDrill,
            1: this.createFolder,
        }

        this.props.showActionSheetWithOptions({
                options, cancelButtonIndex
            },
            buttonIndex => {
                if (actionMap[buttonIndex] != null) actionMap[buttonIndex]();
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

                <NewButton onPress={() => this.addItem()}/>{/*TODO: check for coach before displaying this*/}

            </View>
        );
    }
}

const DrillsListApp = connectActionSheet(DrillsList);
export default DrillsListApp;
