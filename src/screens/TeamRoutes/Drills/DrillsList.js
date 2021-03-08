import React, {Component} from 'react';
import {View, Text, TextInput} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";


class DrillsList extends Component {
    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <View style={globalStyles.topToolBar}>

                    <View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
                        <Text style={{alignSelf: 'center', fontSize: 20}}>Total Drills: 0</Text>
                        <View style={globalStyles.searchToolBar}>
                            <TextInput
                                placeholderTextColor={'#003f5c'}
                                placeholder='Search 🔎'
                                onChangeText={(val) => this.filterMembersByName(val)}>
                            </TextInput>
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}

export default DrillsList