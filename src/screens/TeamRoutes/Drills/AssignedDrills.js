import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import Edge from "../../../firebase";
import GlobalData from "../../../GlobalData";

class AssignedDrills extends Component {

    state = {
        assignedDrills: []
    }

    componentDidMount() {

        Edge.teams.get(GlobalData.teamID).then(team => {

            team.getMember(GlobalData.profileID).then(member =>{

                const drills = member.assignedDrills;
                this.setState({
                    assignedDrills: Object.entries(drills)
                        .map(i => ( { [i[0]]: i[1]} ))
                });

            })

        });
    }


    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <View style={{...globalStyles.topToolBar,
                    backgroundColor: "#89cff0", justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>Drills Assigned to You</Text>
                </View>



            </View>
        );
    }
}

export default AssignedDrills;