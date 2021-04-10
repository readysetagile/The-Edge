import React, {Component} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, FlatList} from 'react-native'
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
        years: []
    }
    flatListRef

    /**
     * Calls the firebase for past and future times
     */
    componentDidMount() {
        firebase.database().ref("GLOBAL_SETTINGS")
            .child("CALENDAR").once('value', res => {
            this.setState({
                YEARS_FUTURE: res.val().YEARS_FUTURE,
                YEARS_PAST: res.val().YEARS_PAST,
            }, () => {
                setTimeout(() => {
                    if(this.flatListRef)
                    this.flatListRef.scrollToIndex({index: (this.state.YEARS_PAST), animated: false})
                }, 100)
            })
        });
    }

    goToMonth(yearNum, monthNum){

        const {navigation} = this.props;
        navigation.navigate("MonthScreen", {yearNum: yearNum,
            monthNum: monthNum,
            minDate: this.state.YEARS_PAST,
            maxDate: this.state.YEARS_FUTURE
        });

    }

    generateMonth(yearNum, month){
        return (
            <TouchableOpacity
                onPress={this.goToMonth.bind(this, yearNum, month)}
                key={month} style={{
                alignSelf: 'center',
                width: '27.5%',
                height: 150,
                margin: '2.85%',
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
            <View style={{flex:1, flexWrap: 'wrap', flexDirection: 'row'}}>
                {months}
            </View>
        )
    }


    generateYearInList = (data) => {
        return(
            <View style={{
                flex: 1,
            }}>
                <Text style={{fontSize: 35, fontWeight: 'bold', left: 20}}>{data.item.yearNum}</Text>
                {data.item.year}
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

        return(
            <FlatList
                ref={(ref) => { this.flatListRef = ref; }}
                data={years}
                renderItem={this.generateYearInList}
                keyExtractor={(item) => item.yearNum.toString()}
            >
            </FlatList>
        )

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