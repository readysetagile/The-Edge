import React from 'react'
import {View, Text, TextInput, Switch, TouchableOpacity, Clipboard, Alert} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import {Formik} from 'formik';
import {Ionicons} from "@expo/vector-icons";
import {createUUID} from "../../../firebase/Util";
import styles from './styles'
import FlatButton from "../../../Components/SubmitButton";


export default function InviteForm({onSubmit, team}){

    const shuffleTeamCode = (props) => {
        let id = createUUID('xxxxxx');
        props.setFieldValue("Team Code", id);
    }

    return(
        <View style={globalStyles.modalView()}>

            <Formik initialValues={{"Team Code": team.inviteData.teamCode, "Enable Joining": team.inviteData.acceptNewMembers}}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        onSubmit(values);
                    }}>

                {(props) => (

                    <View>
                        <Text style={{...globalStyles.title, marginBottom: 10, fontSize: 50}}>Manage Invites</Text>
                        <View style={styles.alignInRow}>
                            <TouchableOpacity onPress={() => {
                                Clipboard.setString(props.values["Team Code"]);
                                Alert.alert("Copied to Clipboard!")
                            }}>
                                <View>
                                    <Text style={styles.textItem}>Team Code: </Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput style={{...globalStyles.inputView, fontSize: 20, width: '40%', height: '70%', padding: 10}}
                                        placeholderTextColor={'#003f5c'}
                                        placeholder={props.values["Team Code"]}
                                        onChangeText={props.handleChange("Team Code")}
                                        onBlur={props.handleBlur("Team Code")}
                            />
                            <Ionicons style={{top: 10, color: 'yellow'}} name={'shuffle'} size={30} onPress={() => shuffleTeamCode(props)}/>
                        </View>
                        <Text style={globalStyles.errorText}>{props.touched["Team Code"] && props.errors["Team Code"]}</Text>

                        <View style={{...styles.alignInRow}}>

                            <Text style={styles.textItem}>Enable Team Joining:</Text>
                            <Switch
                                value={props.values["Enable Joining"]}
                                trackColor={{false: "#767577", true: "#81b0ff"}}
                                thumbColor={props.values["Enable Joining"] ? "white" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={value => props.setFieldValue('Enable Joining', value)}
                                style={{alignSelf: 'center'}}
                            />

                        </View>

                        <FlatButton text={"Save"} style={{marginTop: 40}}/>

                    </View>

                )}

            </Formik>

        </View>
    )

}