import React, {Component} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, ScrollView} from 'react-native'
import colors from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import {firebase} from '../../../firebase/config'

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
        YEARS_FUTURE: 0,
        YEARS_PAST: 0,
    }


    /**
     * Calls the firebase for past and future times
     */
    componentDidMount() {
        firebase.database().ref("GLOBAL_SETTINGS")
            .child("CALENDAR").once('value', res => {
            this.setState({
                YEARS_FUTURE: res.val().YEARS_FUTURE,
                YEARS_PAST: res.val().YEARS_PAST,
            })
        });
    }

    goToMonth(yearNum, monthNum){
        console.log(yearNum, monthNum);
    }

    generateMonth(yearNum, month){
        return (
            <TouchableOpacity
                onPress={this.goToMonth.bind(this, yearNum, month)}
                key={month} style={{
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


    generateYear = (yearNum) => {
        const months = [];
        for (let i = 0; i < 12; i++) {
            months.push(this.generateMonth(yearNum, i));
        }

        return (
            <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%',}}>
                {months}
            </View>
        )
    }



    generateYears() {

        const yearNum = new Date().getFullYear();
        const years = [];

        for(let i = yearNum-this.state.YEARS_PAST; i <= yearNum+this.state.YEARS_FUTURE; i++){
            years.push({
                year: this.generateYear(i),
                yearNum: i
            });
        }


        return (
            <ScrollView>
                {years.map(i => {
                    return(
                        <View key={i.yearNum} style={{
                            flex: 1,
                        }}>
                            <Text style={{fontSize: 35, fontWeight: 'bold', left: 20}}>{i.yearNum}</Text>
                            {i.year}
                        </View>
                    )
                })}
            </ScrollView>
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