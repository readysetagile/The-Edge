import React, {Component, useState} from 'react';
import {View, Image, Text, TextInput, Platform} from 'react-native';
import styles from './styles';
import {DEFAULTAVATR} from "../../firebase/modules/profiles";
import {TouchableOpacity} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firebase from '../../firebase/config';
import Edge, {createUUID} from '../../firebase/index'
import * as ImagePicker from 'expo-image-picker';


export default class CreateProfileScreen extends Component{

    state = {
        image: null,
        username: "",
        uuid: createUUID()
    }

    async uploadImage(){

        if(Platform.OS !== 'web'){

            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted'){
                return false;
            }

        }

    }

    selectImage = async () => {

        await this.uploadImage();
        const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }
        let result = await ImagePicker.launchImageLibraryAsync(options);
        if(!result.cancelled){
            this.setState({image: result});

        }

    }


    async createProfile(){
        await this.uploadImage();
        let user = await Edge.users.get(firebase.auth().currentUser.uid);
        let profile = await user.addProfile(this.state.uuid, this.state.username)
        console.log(profile)

    }

    uploadProfilePicture(){
        if(this.state.image) {

            let uuid = firebase.auth().currentUser.uid;
            let user = Edge.users.get(uuid);
            let storage = firebase.storage();
            let ref = storage.ref(uuid + "/pfp/" + this.state.uuid);
            ref.put(this.state.image.uri);

        }
    }

    render(){
        return(

            <View style={styles.background}>


                    <TouchableOpacity onPress={() => this.selectImage()}>
                        <View style={{alignItems: 'center', padding: 40}}>

                            <Image style={styles.avatar} source={{uri: (!this.state.image ? DEFAULTAVATR : this.state.image.uri)}}/>
                            <Text style={{
                                fontSize: 20,
                                top: 5
                            }}>Upload Image</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={txt => this.setState({username: txt})}
                        />
                    </View>

                    <TouchableOpacity onPress={() => this.createProfile()} style={styles.createProfileButton}>
                        <Text style={{color: 'white', fontSize: 20}}>Create Profile</Text>
                    </TouchableOpacity>

            </View>

        );

    }


}