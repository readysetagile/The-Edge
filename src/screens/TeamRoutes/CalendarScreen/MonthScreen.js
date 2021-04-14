import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableWithoutFeedback, Keyboard, Modal} from 'react-native'
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import Edge from '../../../firebase';
import {Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar';
import GlobalData from "../../../GlobalData";
import {Ionicons} from "@expo/vector-icons";
import styles from "../../LoginRoutes/HomeScreen/styles";
import TeamCreateForm from "../../LoginRoutes/HomeScreen/TeamCreateForm";
import NewEventForm from "./EventForm";


class MonthScreen extends Component {

    maxDate;
    minDate;

    state = {
        maxDate: 0,
        minDate: 0,
        monthNum: 0,
        yearNum: 0,
        events: new Map(),
        eventItems: {},
        modalOpen: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            maxDate: props.navigation.state.params.maxDate,
            minDate: props.navigation.state.params.minDate,
            monthNum: 0,
            yearNum: 0,
            events: new Map(),
            eventItems: {},
            modalOpen: false,
        }
    }


    createEvent(values){

        return new Promise(resolve => {

            Edge.teams.get(GlobalData.teamID).then(team => {

                team.getMember(GlobalData.profileID).then(member => {

                    const startTime = values["start time"], startDate = values["start date"];
                    startTime.setFullYear(startDate.getFullYear());
                    startTime.setMonth(startDate.getMonth());
                    startTime.setDate(startDate.getDate());
                    const endTime = values["end time"], endDate = values["end date"];
                    endTime.setFullYear(endDate.getFullYear());
                    endTime.setMonth(endDate.getMonth());
                    endTime.setDate(endDate.getDate());

                    const eventObj = {
                        startTime: startTime.getTime(),
                        endTime: endTime.getTime(),
                        title: values.title,
                        memberID: member.id,
                        teamID: team.id,
                        location: values.location,
                        summary: values.summary,
                    }

                    resolve(member.createEvent(eventObj));

                })

            })

        })

    }

    componentDidMount() {

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.getMember(GlobalData.profileID).then(member => {

                const events = member.getCalendarEvents();
                const eventMaps = {};

                for(const [K, V] of events){
                    if(V?.startTime){
                        const date = new Date(V.startTime)
                        if (eventMaps[date.toDateString()]) {
                            eventMaps[date.toDateString()].push(V.id);
                        }else{
                            eventMaps[date.toDateString()] = [V.id];
                        }
                    }
                }

                    const eventItems = Object.assign(...Object.entries(eventMaps).map(([k, v]) => {
                        const key = k.split(" ");
                        console.log(key)
                        const stringFormatted = `${key[3]}-${new Date(Date.parse("2020-" + key[2] + "-01")).getMonth()}-${key[2]}`;
                        return {[stringFormatted]: v}
                    }))
                console.log(eventItems, 1)

                this.setState({
                    events: events,
                    eventItems: eventMaps,
                    eventShowing: eventItems
                })
            })
        })

        const params = this.props.navigation.state.params
        setTimeout(() => {
            const agenda = this.agendaRef;
            agenda.calendar.scrollToMonth(new Date(params.yearNum, params.monthNum))
        }, 200)

    }

    generateDay(day){

        console.log(day);

    }


    _eventTapped(event) {
        console.log(event);
    }

    addEventToState(event){

        const events = this.state.eventItems;
        const eventDate = new Date(event.startTime);
        console.log(eventDate, event)
        let dateEvents = events[eventDate.toDateString()];
        if(Array.isArray(dateEvents)){
            dateEvents.push(event.id);
        }else dateEvents = [event.id];
        events[eventDate.toDateString()] = dateEvents;
        const allEvents = this.state.events;
        allEvents.set(event.id, event);
        this.setState({
            eventItems: events,
            events: allEvents
        })

    }

    createEventFromForm = (values) => {

        this.setState({modalOpen: false});
        this.createEvent(values).then(event => {

            this.addEventToState(event);

        })

    }

    newEvent = () => {
        this.setState({modalOpen: true})
    }

    renderCalendar(day, item){
        if((day && item) || (!day && !item)) {

            const items = [];
            if(day){
                const date = new Date(day.timestamp);
                const itemToAdd = this.state.eventItems[date.toDateString()];
                for (let element of itemToAdd) {
                    const stateElement = this.state.events.get(element);
                    items.push({
                        start: stateElement.startTime,
                        end: stateElement.endTime,
                        title: stateElement.title,
                        summary: stateElement.body.summary
                    })

                }

            }

            return (
                <EventCalendar
                    ref={(ref) => this.eventRef = ref}
                    eventTapped={this._eventTapped.bind(this)}
                    events={items}
                    width={Dimensions.get("window").width}
                    scrollToFirst
                    upperCaseHeader
                    headerIconRight={(<Ionicons name={'add'}
                                                size={25}
                                                color={'blue'}
                                                style={{position: 'absolute', right: 20}}
                                                onPress={this.newEvent}/>)}
                    headerIconLeft={null}
                    initDate={this.state.initDate}
                    uppercase
                    onScrollToDay={(d) => {
                        this.agendaRef.chooseDay(new Date(d));
                    }}
                />
            )
        }
    }


    render() {

        return (
            <View style={[globalStyles.container, {padding: 0, backgroundColor: colors.background}]}>

                <Modal visible={this.state.modalOpen} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Ionicons style={globalStyles.closeModal()} name={"close"} size={24}
                                      onPress={() => this.setState({modalOpen: false})}/>
                            <NewEventForm onSubmit={this.createEventFromForm}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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

                    items={this.state.eventShowing}
                    pastScrollRange={this.state.minDate * 12 + (new Date().getMonth())}
                    futureScrollRange={this.state.maxDate * 12 + (11 - new Date().getMonth())}
                    renderEmptyDate={this.renderCalendar.bind(this)}
                    renderEmptyData={this.renderCalendar.bind(this)}
                    renderDay={this.renderCalendar.bind(this)}
                    monthFormat={'yyyy MM'}
                    hideArrows={true}
                    hideExtraDays={true}
                    onDayPress={(day) => {
                        const newDate = new Date(day.timestamp);
                        newDate.setDate(newDate.getDate() + 1);
                        newDate.setFullYear(newDate.getFullYear());
                        this.setState({
                            initDate: newDate.getTime()
                        }, () => {
                            this.eventRef._goToDate(newDate);
                        })

                    }}
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