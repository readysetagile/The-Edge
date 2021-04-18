import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity, Alert} from 'react-native'
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import Edge from '../../../firebase';
import {Agenda} from 'react-native-calendars';
import EventCalendar from 'react-native-events-calendar';
import GlobalData from "../../../GlobalData";
import {Ionicons} from "@expo/vector-icons";
import moment from 'moment';
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
        items: {}
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
            items: {}
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

        //yyyy-mm-dd
        this.props.navigation.setParams({
            modalOpen: false
        })

        Edge.teams.get(GlobalData.teamID).then(team => {
            team.getMember(GlobalData.profileID).then(member => {

                const events = member.getCalendarEvents();
                const eventMaps = {};

                for(const [K, V] of events){
                    if(V?.startTime){

                        const date = new Date(V.startTime)
                        const month = '0' + (date.getMonth()+1), day = '0' + (date.getDate());

                        const dateString = date.getFullYear() + '-' + month.slice(-2) + '-' + day.slice(-2);

                        if (eventMaps.hasOwnProperty(dateString)) {
                            eventMaps[dateString].push(V.id);
                        }else{
                            eventMaps[dateString] = [V.id];
                        }
                    }
                }

                this.setState({
                    events: events,
                    eventItems: eventMaps,
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
        const dateString = MonthScreen.convertDateToDateString(eventDate);
        let dateEvents = events[dateString];
        console.log(dateEvents);

        if(Array.isArray(dateEvents)){
            dateEvents.push(event.id);
        }else dateEvents = [event.id];

        events[dateString] = dateEvents;
        const allEvents = this.state.events;
        allEvents.set(event.id, event);
        console.log(allEvents);

        this.setState({
            eventItems: events,
            events: allEvents
        });

    }

    createEventFromForm = (values) => {

        this.setState({modalOpen: false});
        this.props.navigation.setParams({
            modalOpen: false
        })
        this.createEvent(values).then(event => {
            this.addEventToState(event);
        })

    }

    newEvent = () => {
        this.setState({modalOpen: true})
    }

    static convertDateToDateString(date){
        const month = '0' + (date.getMonth()+1), day = '0' + (date.getDate());
        return date.getFullYear() + '-' + month.slice(-2) + '-' + day.slice(-2);
    }

    renderCalendar(day, item){
        //console.log(day, item)
        if((day && item)) {

            const items = [];
            if(day){
                const date = new Date(day.timestamp);
                date.setDate(date.getDate()+1);

                const itemToAdd = this.state.eventItems[MonthScreen.convertDateToDateString(date)];
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

            return this.renderEventCalendar(items);

        }
    }

    renderEventCalendar(items=undefined){

        return (
            <EventCalendar
                ref={(ref) => this.eventRef = ref}
                eventTapped={this._eventTapped.bind(this)}
                events={items}
                width={Dimensions.get("window").width}
                scrollToFirst={true}
                upperCaseHeader
                headerIconRight={(<Ionicons name={'add'}
                                            size={25}
                                            color={'blue'}
                                            style={{position: 'absolute', right: 20}}
                                            onPress={this.newEvent}/>)}
                headerIconLeft={null}
                initDate={this.state.initDate}
                uppercase
                // onScrollToDay={(d) => {
                //     this.agendaRef.chooseDay(new Date(d));
                // }}
            />
        )

    }


    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    renderItem(item) {
        const event = this.state.events.get(item)
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    flex: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginRight: 10,
                    marginTop: 17,
                }}
                onPress={() => Alert.alert(event.title)}
            >
                <Text>{event.title}</Text>
                <Text>{event.body.location}</Text>
                <Text>{event.body.summary}</Text>
                <Text>{new Date(event.startTime).toString()}</Text>
            </TouchableOpacity>
        );
    }

    render() {

        const date = new Date();
        return (
            <View style={[globalStyles.container, {padding: 0, backgroundColor: colors.background}]}>

                <Modal visible={this.state.modalOpen || this.props.navigation.getParam("modalOpen")} animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Ionicons style={globalStyles.closeModal()} name={"close"} size={24}
                                      onPress={() => {
                                          this.props.navigation.setParams({
                                              modalOpen: false
                                          });
                                          this.setState({modalOpen: false})
                                      }}/>
                            <NewEventForm onSubmit={this.createEventFromForm}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Agenda
                    ref={(ref) => this.agendaRef = ref}
                    isDefaultViewCalendar={true}
                    rowHasChanged={(r1, r2) => (r1 !== r2)}
                    theme={{
                        calendarBackground: "#F3CCFF",
                        arrowColor: '#5EA952',
                        dayTextColor: 'black',
                        monthTextColor: 'red',
                        textSectionTitleColor: 'darkgreen'
                    }}

                    items={this.state.eventItems}
                    pastScrollRange={this.state.minDate * 12 + (date.getMonth())}
                    futureScrollRange={this.state.maxDate * 12 + (11 - date.getMonth())}

                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEventCalendar.bind(this)}
                    renderEmptyData={this.renderEventCalendar.bind(this)}
                    //renderDay={this.loadItems.bind(this)}
                    loadItemsForMonth={this.loadItems.bind(this)}
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
                            this.eventRef?._goToDate(newDate);
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