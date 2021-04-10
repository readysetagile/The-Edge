import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native'
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import Edge from '../../../firebase';
import {Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar';
import GlobalData from "../../../GlobalData";

class MonthScreen extends Component {

    maxDate;
    minDate;

    state = {
        maxDate: 0,
        minDate: 0,
        monthNum: 0,
        yearNum: 0,
        events: null,
        eventItems: null,
    }

    constructor(props) {
        super(props);
        this.state = props.navigation.state.params;
    }

    createEvent(){

        Edge.teams.get(GlobalData.teamID).then(team => {

            team.getMember(GlobalData.profileID).then(member => {



            })

        })

    }

    componentDidMount() {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.getMember(GlobalData.profileID).then(member => {

                const events = member.getCalendarEvents();
                const eventMaps = {};

                for(const [K, V] of events){
                    if(V?.startDate){
                        if (eventMaps[V.startDate]) {
                            eventMaps[V.startDate].push(V.id);
                        }else{
                            eventMaps[V.startDate] = [V.id];
                        }
                    }
                }

                this.setState({
                    events: events,
                    eventItems: eventMaps
                })
            })
        })

        const params = this.props.navigation.state.params
        setTimeout(() => {
            const agenda = this.agendaRef;
            agenda.calendar.scrollToMonth(new Date(params.yearNum, params.monthNum, 2))
        }, 100)

    }

    generateDay(day){

        console.log(day);

    }

    _eventTapped(event) {
        console.log(event);
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
                    items={{}}
                    pastScrollRange={this.state.minDate * 12 + (new Date().getMonth())}
                    futureScrollRange={this.state.maxDate * 12 + (11 - new Date().getMonth())}

                    renderEmptyDate={() => {
                        return (
                            <EventCalendar/>
                        );
                    }}
                    renderEmptyData={() => {
                        return (
                            <EventCalendar
                                eventTapped={this._eventTapped.bind(this)}
                                events={this.state.events}
                                width={Dimensions.get("window").width}
                                initDate={'2017-09-07'}
                                scrollToFirst
                                upperCaseHeader
                                headerIconLeft={null}
                                headerIconRight={null}
                                uppercase
                            />
                        );
                    }}
                    renderDay={(day, item) => {
                        if (day) {
                            this.generateDay(day);
                        }
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