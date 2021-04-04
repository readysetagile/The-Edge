import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";


class CalendarScreen extends Component {
    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <Calendar
                    theme={{
                        calendarBackground: colors.titleText
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
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    // renderArrow={(direction) => {
                    //     console.log(direction, 1)
                    // }}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter.
                    renderHeader={(dateGiven) => {
                        const date = new Date(dateGiven);
                        const month = date.toLocaleString('default', { month: 'long' });
                        return(
                            <Text style={{fontWeight: '500', fontSize: 25}}>{month + " - " + date.getFullYear()}</Text>
                        )
                    }}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                />

            </View>
        );
    }
}


export default CalendarScreen;