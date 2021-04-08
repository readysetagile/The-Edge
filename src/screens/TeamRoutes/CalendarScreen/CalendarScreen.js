import React, {Component} from 'react';
import {Dimensions, View, Text, TouchableOpacity} from "react-native";
import EventCalendar from 'react-native-events-calendar'
import {Calendar, Agenda} from 'react-native-calendars';
import colors from "../../styles";


let { width } = Dimensions.get('window')

class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    start: '2017-09-06 22:30:00',
                    end: '2017-09-06 23:30:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA 3032',
                    color: 'green',
                },
                {
                    start: '2017-09-07 00:30:00',
                    end: '2017-09-07 01:30:00',
                    title: 'Dr. Mariana Joseph',
                    summary: '3412 Piedmont Rd NE, GA',
                    color: 'red',
                },
            ],
        };
    }

    _eventTapped(event) {
        console.log((event));
    }

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
            <View style={{flex: 1, marginTop: 20}}>

                <Calendar

                    markingType={'period'}
                    isDefaultViewCalendar={true}
                    rowHasChanged={(r1, r2) => (r1.text !== r2.text)}
                    style={{borderRadius: 10}}
                    theme={{
                        calendarBackground: "#F3CCFF",
                        arrowColor: '#5EA952',
                        dayTextColor: 'black',
                        monthTextColor: 'red',
                        textSectionTitleColor: 'darkgreen'
                    }}
                    items={this.state.items}
                    renderItem={this.renderItem.bind(this)}

                    // Initially visible month. Default = Date()
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {
                        console.log('selected day', day)
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {
                        console.log('selected day', day)
                    }}
                    monthFormat={'yyyy MM'}
                    hideArrows={true}
                    hideExtraDays={true}
                    firstDay={1}
                    renderHeader={(dateGiven) => {
                        const date = new Date(dateGiven);
                        const month = date.toLocaleString('default', {month: 'long'});
                        return (
                            <Text style={{fontWeight: '500', fontSize: 25}}>{month + " - " + date.getFullYear()}</Text>
                        )
                    }}
                />
                {/*<EventCalendar*/}
                {/*    eventTapped={this._eventTapped.bind(this)}*/}
                {/*    events={this.state.events}*/}
                {/*    width={width}*/}
                {/*    initDate={'2017-09-07'}*/}
                {/*    upperCaseHeader*/}
                {/*    uppercase*/}
                {/*    scrollToFirst={false}*/}
                {/*/>*/}
            </View>
        );
    }
}
export default CalendarScreen;
