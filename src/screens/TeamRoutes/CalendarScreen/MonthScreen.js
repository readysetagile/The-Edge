import React, {Component} from 'react';
import {Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import Edge from '../../../firebase';
import {Agenda} from 'react-native-calendars';
import GlobalData from "../../../GlobalData";
import {Ionicons} from "@expo/vector-icons";
import moment from 'moment';
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
        items: {},
        animatedEvents: {}
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
            items: {},
            animatedEvents: {}
        }
    }

    static convertDateToDateString(date) {
        const month = '0' + (date.getMonth() + 1), day = '0' + (date.getDate());
        return date.getFullYear() + '-' + month.slice(-2) + '-' + day.slice(-2);
    }

    combineTimes(startTime, startDate){
        startTime.setFullYear(startDate.getFullYear());
        startTime.setMonth(startDate.getMonth());
        startTime.setDate(startDate.getDate());
        return startTime;
    }

    createEvent(values) {

        return new Promise(resolve => {

            Edge.teams.get(GlobalData.teamID).then(team => {

                team.getMember(GlobalData.profileID).then(member => {

                    let startTime = values["start time"], startDate = values["start date"];
                    startTime = this.combineTimes(startTime, startDate)
                    let endTime = values["end time"], endDate = values["end date"];
                    endTime = this.combineTimes(endTime, endDate);

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

                for (const [K, V] of events) {
                    if (V?.startTime) {

                        const date = new Date(V.startTime)
                        const month = '0' + (date.getMonth() + 1), day = '0' + (date.getDate());

                        const dateString = date.getFullYear() + '-' + month.slice(-2) + '-' + day.slice(-2);

                        if (eventMaps.hasOwnProperty(dateString)) {
                            eventMaps[dateString].push(V.id);
                        } else {
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

    addEventToState(event) {

        const events = this.state.eventItems;
        const eventDate = new Date(event.startTime);
        const dateString = MonthScreen.convertDateToDateString(eventDate);
        let dateEvents = events[dateString];

        if (Array.isArray(dateEvents)) {
            dateEvents.push(event.id);
        } else dateEvents = [event.id];

        events[dateString] = dateEvents;
        const allEvents = this.state.events;
        allEvents.set(event.id, event);

        this.setState({
            eventItems: events,
            events: allEvents
        });

    }

    createEventFromForm = (values) => {

        const eventID = this.state.editingEventID;
        this.setState({modalOpen: false, editingEventID: null});
        this.props.navigation.setParams({
            modalOpen: false
        })
        if(!eventID) {
            this.createEvent(values).then(event => {
                this.addEventToState(event);
            })
        }else{
            this.updateEvent(values, eventID);

            const eventItems = this.state.eventItems;
            this.setState({
                eventItems: null,
            }, () => {
                this.setState({
                    eventItems: eventItems
                })
            })

        }
    }

    updateEvent(values, eventID){
        const event = this.state.events.get(eventID);
        let startTime = values['start time'], startDate = values['start date'];
        let endTime = values['end time'], endDate = values['end date'];
        startTime = this.combineTimes(startTime, startDate);
        endTime = this.combineTimes(endTime, endDate);

        event.startTime = startTime.getTime();
        event.endTime = endTime.getTime();
        event.title = values.title;
        event.body = {
            location: values.location,
            summary: values.summary,
        };
        event.save();
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

    timeToFriendlyString(time) {
        return moment(time).format('MMMM Do, h:mm:ss a')
    }

    renderItem(item) {
        const event = this.state.events.get(item);
        return (

            <TouchableOpacity
                style={{
                    backgroundColor: '#F3CCFF',
                    flex: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginRight: 10,
                    marginTop: 17,
                }}>

                <Text style={{color: 'black', alignSelf: 'center', fontWeight: "700"}}>{event.title}</Text>

                <Ionicons name={'pencil'} size={18} color={'blue'} style={{position: 'absolute', right: 20, top: 10}}
                          onPress={() => this.setState({modalOpen: true, editingEventID: event.id})}/>

                {
                    event.body.summary ?

                        <View style={{paddingTop: 5, paddingBottom: 5}}>
                            <Text>Summary: </Text>
                            <Text style={{

                                backgroundColor: 'white'
                            }}>{event.body.summary}</Text>

                        </View>
                        : null}

                {
                    event.body.location ? <View>
                        <Text>Location: </Text>
                        <Text style={{backgroundColor: 'white'}}>{event.body.location}</Text>
                    </View> : null
                }

                <Text>Start:</Text>
                <Text style={{backgroundColor: 'white'}}>{this.timeToFriendlyString(event.startTime)}</Text>

                <Text style={{marginTop: 5}}>End:</Text>
                <Text style={{backgroundColor: 'white'}}>{this.timeToFriendlyString(event.endTime)}</Text>

            </TouchableOpacity>

        );
    }

    renderEmptyDate() {
        return (
            <View style={{
                height: 15,
                flex: 1,
                paddingTop: 30
            }}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    render() {

        const date = new Date();
        return (
            <View style={[globalStyles.container, {padding: 0, backgroundColor: colors.background}]}>

                <Modal visible={this.state.modalOpen || this.props.navigation.getParam("modalOpen")}
                       animationType={'slide'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Ionicons style={globalStyles.closeModal()} name={"close"} size={24}
                                      onPress={() => {
                                          this.props.navigation.setParams({
                                              modalOpen: false
                                          });
                                          this.setState({modalOpen: false, editingEventID: null })
                                      }}/>
                            <NewEventForm onSubmit={this.createEventFromForm} event={this.state.events.get(this.state.editingEventID)}/>
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
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    renderEmptyData={this.renderEmptyDate.bind(this)}
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