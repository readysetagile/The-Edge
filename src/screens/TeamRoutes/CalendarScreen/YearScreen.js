import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, Text, SafeAreaView} from 'react-native'
import {Calendar} from "react-native-calendars";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {firebase} from '../../../firebase/config';

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

    state = {
        YEARS_FUTURE: 3,
        YEARS_PAST: 3
    }

    componentDidMount() {

        firebase.database().ref("GLOBAL_SETTINGS")
            .child("CALENDAR").once('value', res => {
            this.setState({
                YEARS_FUTURE: res.YEARS_FUTURE,
                YEARS_PAST: res.YEARS_PAST
            })
        });

    }

    generateMonth(year, month) {

        const date = new Date(year, month, 1);

        return (

            <TouchableOpacity key={month} style={{
                width: '28%',
                height: 150,
                margin: 10,
            }}>
                <View pointerEvents={'none'}>

                    <Calendar
                        style={{
                            padding: 10,
                            borderRadius: 10
                        }}
                        theme={{
                            calendarBackground: "#F3CCFF",
                            arrowColor: '#5EA952',
                            dayTextColor: 'black',
                            monthTextColor: 'red',
                            textSectionTitleColor: 'darkgreen',
                            textDayFontSize: 10,

                            'stylesheet.calendar.main': {

                                monthView: {
                                    flex: 1,
                                    backgroundColor: "#F3CCFF"
                                },
                                week: {
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                },
                                container: {
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: "#F3CCFF",
                                }

                            }

                        }}
                        disableTouchEvent={true}
                        disabledByDefault={false}
                        current={date}
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
                        disableAllTouchEventsForDisabledDays={true}
                        // Replace default month and year title with custom one. the function receive a date as parameter.
                        renderHeader={this.generateMonthName.bind(this, month)}
                        // Enable the option to swipe between months. Default = false
                        enableSwipeMonths={false}
                    />

                </View>

            </TouchableOpacity>

        )

    }

    generateMonthName(monthNum) {
        return (
            <Text style={{fontWeight: '500', fontSize: 25}}>{this.dates[monthNum]}</Text>
        )
    }

    generateYear = (yearNum) => {
        const date = yearNum.item.date;
        const months = [];
        for (let i = 0; i < 12; i++) {
            months.push(this.generateMonth(date, i));
        }

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'orange'
            }}>
                <Text style={{fontSize: 35, fontWeight: 'bold', left: 20}}>{date}</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%',}}>
                    {months}
                </View>
            </View>
        )

    }

    generateYears() {

        const data = [];
        const currDate = new Date();
        const currentYear = currDate.getFullYear();
        for (let i = this.state.YEARS_PAST; i >= 0; i--) {
            data.push({
                date: currentYear-i
            })
        }

        return (
            
                <FlatList
                    style={{backgroundColor: 'red'}}
                    data={data}
                    renderItem={(item) => {
                        console.log(item)
                        return <Text>hi</Text>
                    }}
                    keyExtractor={(item) => item.date.toString()}
                />

        );

    }


    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
                {this.generateYears()}
            </SafeAreaView>
        );
    }
}

export default YearScreen;