import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, Text, SafeAreaView, ScrollView} from 'react-native'
import {Calendar} from "react-native-calendars";
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {firebase} from '../../../firebase/config';
import {Ionicons} from "@expo/vector-icons";

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
        YEARS_PAST: 3,
        yearData: null
    }

    componentDidMount() {

        // firebase.database().ref("GLOBAL_SETTINGS")
        //     .child("CALENDAR").once('value', res => {
        //     this.setState({
        //         YEARS_FUTURE: res.YEARS_FUTURE,
        //         YEARS_PAST: res.YEARS_PAST,
        //     })
        // });

    }

    /*generateMonth(year, month) {

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
                        // theme={{
                        //     calendarBackground: "#F3CCFF",
                        //     arrowColor: '#5EA952',
                        //     dayTextColor: 'black',
                        //     monthTextColor: 'red',
                        //     textSectionTitleColor: 'darkgreen',
                        //     textDayFontSize: 10,
                        //
                        //     'stylesheet.calendar.main': {
                        //
                        //         monthView: {
                        //             flex: 1,
                        //             backgroundColor: "#F3CCFF"
                        //         },
                        //         week: {
                        //             flex: 1,
                        //             flexDirection: 'row',
                        //             justifyContent: 'space-around',
                        //         },
                        //         container: {
                        //             width: '100%',
                        //             height: '100%',
                        //             backgroundColor: "#F3CCFF",
                        //         }
                        //
                        //     }
                        //
                        // }}
                        disableTouchEvent={true}
                        disabledByDefault={false}
                        current={date}
                        hideArrows={true}
                        disableMonthChange={true}
                        firstDay={0}
                        hideDayNames={true}
                        showWeekNumbers={false}
                        disableArrowLeft={true}
                        disableArrowRight={true}
                        disableAllTouchEventsForDisabledDays={true}
                        renderHeader={this.generateMonthName.bind(this, month)}
                        enableSwipeMonths={false}
                    />

                </View>

            </TouchableOpacity>

        )

    }*/

    generateMonth(month){
        return (
            <TouchableOpacity key={month} style={{
                width: '28%',
                height: 150,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 15,
                backgroundColor: "#F3CCFF",
            }}>
                <Text style={{fontWeight: '500', fontSize: 25}}>
                    {this.dates[month]}
                </Text>
                <Ionicons name={'calendar-outline'} size={90}/>
            </TouchableOpacity>
        )
    }

    generateMonthName(monthNum) {
        return (
            <Text style={{fontWeight: '500', fontSize: 25}}>{this.dates[monthNum]}</Text>
        )
    }

    generateYear = (yearNum) => {
        const date = yearNum;
        const months = [];
        for (let i = 0; i < 12; i++) {
            //months.push(this.generateMonth(date, i));
            months.push(this.generateMonth(i));
        }

        return (
                <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%',}}>
                    {months}
                </View>
        )

    }



    generateYears() {

        const yearNum = new Date().getFullYear();
        const year = this.generateYear(yearNum);
        const years = [];

        for(let i = yearNum-this.state.YEARS_PAST; i < yearNum+this.state.YEARS_FUTURE; i++){
            years.push({
                year: year,
                yearNum: i
            })
        }


        return (


            <ScrollView>

                {years.map(i => {

                    return(

                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{fontSize: 35, fontWeight: 'bold', left: 20}}>{i.yearNum}</Text>
                            {i.year}
                        </View>

                    )

                })}

            </ScrollView>

            // <FlatList
            //     data={data}
            //     renderItem={this.generateYear}
            //     keyExtractor={(item) => item.date.toString()}
            //     extraData={this.state.YEARS_PAST}
            // />

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