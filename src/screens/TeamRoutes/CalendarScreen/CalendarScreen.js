import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import NewButton from "../../../Components/NewButton";


class CalendarScreen extends Component {

    state={
        items: {
            '2021-04-04': [
                {
                name: 'item 1 - any js object',
                height: 50,
                time: '10:30'
                },
                {
                    name: 'item 2',
                    height: 50,
                    time: '10:35'
                }
                ]
        }
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

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    loadItems(day) {
        setTimeout(() => {
            console.log(day, 'loaded');
            // for (let i = -15; i < 85; i++) {
            //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            //     const strTime = this.timeToString(time);
            //     if (!this.state.items[strTime]) {
            //         this.state.items[strTime] = [];
            //         const numItems = Math.floor(Math.random() * 3 + 1);
            //         for (let j = 0; j < numItems; j++) {
            //             this.state.items[strTime].push({
            //                 name: 'Item for ' + strTime + ' #' + j,
            //                 height: Math.max(50, Math.floor(Math.random() * 150))
            //             });
            //         }
            //     }
            // }
            // const newItems = {};
            // Object.keys(this.state.items).forEach(key => {
            //     newItems[key] = this.state.items[key];
            // });
            // this.setState({
            //     items: newItems
            // });
        }, 1000);
    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <Agenda

    isDefaultViewCalendar={true}
    rowHasChanged={(r1, r2) => (r1.text !== r2.text)}
    style={{borderRadius: 10}}
    theme={{
        calendarBackground: "#F3CCFF",
        arrowColor: '#5EA952',
        dayTextColor: 'black',
        monthTextColor: 'red',
        textSectionTitleColor: 'darkgreen',
        'stylesheet.agenda.main': {
            reservations: {
                backgroundColor: colors.inputBox,
                flex: 1,
                marginTop: 104
            }
        }
    }}
    items={this.state.items}
    renderItem={this.renderItem.bind(this)}
    renderEmptyData = {() => {
        return (
            <View>
                <Text>This is empty date!</Text>
            </View>
        );
    }}
    renderEmptyDate={() => {
        return (
            <View>
                <Text>This is empty date!</Text>
            </View>
        );
    }}
    loadItemsForMonth={this.loadItems.bind(this)}
    renderDay={(day, item) => {
        if (item?.time)
            return (<Text>{item.time}</Text>);
    }}
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
            </View>
        );
    }
}


export default CalendarScreen;