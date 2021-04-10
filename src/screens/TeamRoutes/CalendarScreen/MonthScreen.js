import React, {Component} from 'react';
import {Text, View} from 'react-native'
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import {Agenda} from 'react-native-calendars';

class MonthScreen extends Component {

    maxDate;
    minDate;

    state = {
        maxDate: 0,
        minDate: 0,
        monthNum: 0,
        yearNum: 0
    }

    constructor(props) {
        super(props);
        this.state = props.navigation.state.params;
    }

    componentDidMount() {

        const params = this.props.navigation.state.params
        setTimeout(() => {
            const agenda = this.agendaRef;
            agenda.calendar.scrollToMonth(new Date(params.yearNum, params.monthNum, 2))
        }, 100)

    }

    render() {

        return (
            <View style={[globalStyles.container, {padding: 0, backgroundColor: colors.background}]}>

                <Agenda
                    ref={(ref) => this.agendaRef = ref}
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
                    items={{
                        '2021-04-04': [{
                            name: 'item 1 - any js object',
                            height: 50,
                            time: '10:30'
                        }, {name: 'item 2', height: 50, time: '10:35'}]
                    }}
                    pastScrollRange={this.state.minDate * 12 + (new Date().getMonth())}
                    futureScrollRange={this.state.maxDate * 12 + (11 - new Date().getMonth())}
                    renderEmptyDate={() => {
                        return (
                            <View>
                                <Text>This is empty date!</Text>
                            </View>
                        );
                    }}
                    renderDay={(day, item) => {
                        if (item?.time)
                            return (<Text>{item.time}</Text>);
                    }}
                    monthFormat={'yyyy MM'}
                    hideArrows={true}
                    hideExtraDays={true}
                    firstDay={1}
                    disableAllTouchEventsForDisabledDays={true}
                    renderHeader={(dateGiven) => {
                        const date = new Date(dateGiven);
                        const month = new Intl.DateTimeFormat('en', {month: 'short'})
                        return (
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 25
                            }}>{month.format(date) + " - " + date.getFullYear()}</Text>
                        )
                    }}
                />

            </View>
        );
    }
}

export default MonthScreen;