import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView} from 'react-native';
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

    async addProfile(){
        let userPromise = await Edge.users.get(firebase.auth().currentUser.uid);
        let profile = userPromise.addProfile(createUUID(), "madness")
        this.state.accounts.push(this.generateProfileImage(profile.username, this.state.accounts.length));
        this.setState({
            accounts: this.state.accounts
        })

    }

    generateProfileImage(username, index){
        return(
            <View key={index} style={styles.item}>
                <TouchableOpacity onPress={() => this.addProfile()}>
                    <Image style={styles.profilePicture} source={{uri: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"}}/>
                    <Text style={styles.text}>{username}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    enterProfile(){

    }

    async componentDidMount(){
        try{
            let profiles = await this.getProfiles();
            if(profiles != null) {
                const accArr = Array.from(profiles.values()).filter(i => i != null).map((i, j) => {
                    return this.generateProfileImage(i.username, j)
                });
                this.setState({accounts: accArr});
            }
        }catch(err){
            console.error(err);
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>
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