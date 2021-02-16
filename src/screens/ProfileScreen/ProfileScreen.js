import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView, Button} from 'react-native';
import styles from './styles';
import Edge, {createUUID} from "../../firebase";
import {firebase} from "../../firebase/config";

export default class ProfileScreen extends Component {

    state = {
        accounts: []
    }

    constructor(props) {
        super(props);

    }

    async getProfiles() {
        let user = await Edge.users.get(firebase.auth().currentUser.uid);
        if (user == null) return null
        return user.profiles;
    }

    async onAddProfile(){
        let userPromise = await Edge.users.get(firebase.auth().currentUser.uid);
        let profile = userPromise.addProfile(createUUID(), "madness")
        this.state.accounts.push(this.generateProfileImage(profile, this.state.accounts.length));
        this.setState({
            accounts: this.state.accounts
        })

    }

    editProfile(profile){
        console.log(profile)
    }

    generateProfileImage(profile, index){
        return(
            <View key={index} profile={profile} style={styles.item}>

                    <TouchableOpacity onPress={() => this.enterProfile(profile)} onLongPress={() => this.editProfile(profile)}
                                      delayLongPress={500}>
                        <Image style={styles.profilePicture} source={{uri: profile.avatar}}/>
                        <Text style={styles.text}>{profile.username}</Text>
                    </TouchableOpacity>
            </View>
        )
    }

    enterProfile(profile){

        //navigation.navigate("screen", profile)

    }

    async componentDidMount(){
        try{
            let profiles = await this.getProfiles();
            if(profiles != null) {
                const accArr = Array.from(profiles.values()).filter(i => i != null).map((i, j) => {
                    return this.generateProfileImage(i, j)
                });
                this.setState({accounts: accArr});
            }
        }catch(err){
            console.error(err);
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <Text style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    padding: 5
                }}>
                    Who is using this account?
                </Text>

                <ScrollView>
                    <View style={styles.profileContainer}>
                            {this.state.accounts}
                    </View>
                </ScrollView>

            </View>
        );
    }
}