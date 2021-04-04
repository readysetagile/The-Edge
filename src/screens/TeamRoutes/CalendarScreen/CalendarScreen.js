import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";


class CalendarScreen extends Component {

    renderItem(item) {
        return (
            <TouchableOpacity
                //testID={testIDs.agenda.ITEM}
                style={[{
                    backgroundColor: 'white',
                    flex: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginRight: 10,
                    marginTop: 17
                }, {height: item.height}]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <Agenda

                    rowHasChanged={(r1, r2) => (r1.text !== r2.text)}
                    style={{borderRadius: 10}}
                    theme={{
                        calendarBackground: "#F3CCFF",
                        arrowColor: '#5EA952',
                        dayTextColor: 'black',
                        monthTextColor: 'red',
                        textSectionTitleColor: 'darkgreen'
                    }}
                    items={{
                        '2021-04-04': [{
                            name: 'item 1 - any js object',
                            height: 50,
                            time: '10:30'
                        }, {name: 'item 2', height: 50, time: '10:35'}]
                    }}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyData = {() => {return (<NewButton/>);}}
                    renderEmptyDate={() => {
                        console.log('empty render')
                        return (
                            <View >
                                <Text>This is empty date!</Text>
                            </View>
                        );
                    }}
                    renderDay={(day, item) => {
                        console.log(item);
                        if(item?.time)
                        return (<Text>{item.time}</Text>);
                    }}
                    // Initially visible month. Default = Date()
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    hideArrows={true}
                    hideExtraDays={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Replace default month and year title with custom one. the function receive a date as parameter.
                    renderHeader={(dateGiven) => {
                        const date = new Date(dateGiven);
                        const month = date.toLocaleString('default', { month: 'long' });
                        return(
                            <Text style={{fontWeight: '500', fontSize: 25}}>{month + " - " + date.getFullYear()}</Text>
                        )
                    }}
                />

            </View>
        );
    }
}


export default CalendarScreen;