import React, {Component} from 'react';
import {View, Text} from "react-native";

class ViewQuestions extends Component {

    render() {
        console.log(this.props.navigation.getParam("data"), 1)
        return (
            <View style={{flex: 1, padding: 50}}>
                <Text>hi there</Text>
            </View>
        );
    }

}

export default ViewQuestions;