import React, {Component} from 'react';
import {View} from 'react-native'
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Calendar, Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar'

class MonthScreen extends Component {
    render() {
        return (
            <View style={[globalStyles.container, {backgroundColor: colors.background}]}>



            </View>
        );
    }
}

export default MonthScreen;