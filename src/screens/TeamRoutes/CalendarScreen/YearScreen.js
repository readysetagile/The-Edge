import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native'
import {Calendar} from "react-native-calendars";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
class YearScreen extends Component {

    dates = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }

    generateMonth(year, month){

        const date = new Date(year, month, 1);

        return(

            <TouchableOpacity key={month} style={{
                width: '28%',
                height: 150,
                margin: 10,
            }}>

                <Calendar
                    style={{
                        padding: 10
                    }}
                    theme={{
                        calendarBackground: "#F3CCFF",
                        arrowColor: '#5EA952',
                        dayTextColor: 'black',
                        monthTextColor: 'red',
                        textSectionTitleColor: 'darkgreen',
                        textDayFontSize: 10,

                        'stylesheet.calendar.main':{

                            monthView:{
                                flex: 1,
                                backgroundColor: "#F3CCFF"
                            },
                            week:{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            },
                            container:{
                                width: '100%',
                                height: '100%',
                                backgroundColor: "#F3CCFF",
                            }

                        }

                    }}
                    //Button Yes
                    //'src/calendar/day/basic/index.js'
                    disableTouchEvent={true}
                    disabledByDefault={true}
                    current={date}
                    //hideExtraDays={false}
                    hideArrows={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={0}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Disable left arrow. Default = false
                    disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    disableArrowRight={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={false}
                    // Replace default month and year title with custom one. the function receive a date as parameter.
                    renderHeader={(dateGiven) => {
                        return(
                            <Text style={{fontWeight: '500', fontSize: 25}}>{this.dates[month]}</Text>
                        )
                    }}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={false}
                />

            </TouchableOpacity>

        )

    }

    generateYear(date){

        const months = [];
        for(let i = 0; i < 12; i++){
            months.push(this.generateMonth(date.getFullYear(), i));
        }

        return(
            <View style={{
                flex: 1,
            }}>
                <Text style={{fontSize: 35, fontWeight: 'bold'}}>{new Date(date).getFullYear()}</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%',}}>
                    {months}
                </View>
            </View>
        )

    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: colors.background}}>
                {this.generateYear(new Date())}
            </View>
        );
    }
}

export default YearScreen;