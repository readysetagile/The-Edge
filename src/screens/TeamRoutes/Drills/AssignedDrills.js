import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal} from 'react-native';
import {globalStyles} from "../../GlobalStyles";
import colors from "../../styles";
import Edge from "../../../firebase";
import GlobalData from "../../../GlobalData";
import styles from "./styles";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import NewDrill from "./NewDrill";

class AssignedDrills extends Component {

    state = {
        assignedDrills: {},
        drills: {},
        lastDrillClicked: null,
        showModal: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        Edge.teams.get(GlobalData.teamID).then(team => {

            team.getMember(GlobalData.profileID).then(member => {

                const drills = member.assignedDrills;
                this.setState({
                    assignedDrills: drills || {},
                    drills: team.modules.drills?.drills || {}
                })

            });
        });
    }

    setDrillClicked(drill){
        this.setState({showModal: true,
            lastDrillClicked: drill.drillName})
    }

    generateDrill(drill){

        return (
            <TouchableOpacity onPress={this.setDrillClicked.bind(this, drill)}
                              key={drill.id}>

                <View style={styles.itemContainer} onPress={() => this.setDrillViewing(drill)}>
                    <FontAwesome name={'file'} size={24} color={this.state.drills[drill.drillName].color} style={{alignSelf: 'center'}}/>
                    <Text style={{alignSelf: 'center', paddingLeft: 10, fontSize: 20}}>{drill.drillName}</Text>
                </View>

            </TouchableOpacity>
        )

    }

    createDrillViewer(){

        if(this.state.lastDrillClicked) {
            const content = this.state.drills[this.state.lastDrillClicked].content;

            return (
                <View style={globalStyles.modalContent}>
                    <Ionicons style={{...globalStyles.closeModal(3), padding: 15}}
                              name={"close"} size={24}
                              onPress={() => this.setState({showModal: false})}/>

                    <NewDrill isReadOnly={true} content={content}/>

                </View>

            )
        }

    }

    render() {
        return (
            <View style={{...globalStyles.container, backgroundColor: colors.background}}>

                <Modal visible={this.state.showModal} animationType={'slide'}>
                        {this.createDrillViewer()}
                </Modal>

                <View style={{...globalStyles.topToolBar,
                    backgroundColor: "#89cff0", justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>Drills Assigned to You</Text>
                </View>

                {
                    Object.keys(this.state.assignedDrills).length < 0 ?

                    Object.entries(this.state.assignedDrills).map(i => {

                        const content = i[1];
                        if(content){
                            return this.generateDrill(content);
                        }

                    })
                        : (
                            <View>
                                <Text style={{
                                    fontSize: 25,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    textShadowColor: 'rgba(0,0,0,.25)',
                                    textShadowOffset: {width: -2, height: 1},
                                    textShadowRadius: 2
                                }}>
                                    Lucky you! You have no drills to be completed!</Text>
                            </View>
                        )
                }

            </View>
        );
    }
}

export default AssignedDrills;