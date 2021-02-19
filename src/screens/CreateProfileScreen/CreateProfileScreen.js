import React, {Component} from 'react';
import {View, Image, Text, TextInput, Platform, Alert} from 'react-native';
import styles from './styles';
import {DEFAULTAVATR} from "../../firebase/modules/profiles";
import {TouchableOpacity} from "react-native";
import {firebase} from '../../firebase/config';
import Edge from '../../firebase/index'
import * as ImagePicker from 'expo-image-picker';
import {NavigationActions, StackActions} from "react-navigation";
import {createUUID} from "../../firebase/Util";


export default class CreateProfileScreen extends Component{

    state = {
        image: null,
        username: "",
        uuid: createUUID()
    }

    async uploadImage(){

        if(Platform.OS !== 'web'){
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            return status === 'granted';
        }
        return false;

    }

    selectImage = async () => {//TODO figure out proper sizes for profile pictures

        if(await this.uploadImage()) {
            const options = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }
            let result = await ImagePicker.launchImageLibraryAsync(options);
            if (!result.cancelled) {
                this.setState({image: result});

            }
        }

    }


    async createProfile(){
        await this.uploadProfilePicture();
        let user = await Edge.users.get(firebase.auth().currentUser.uid);

        if(!this.state.username){
            Alert.alert("Invalid Username");
            return;
        }
        let profile = await user.addProfile(this.state.uuid, this.state.username);
        const {navigation} = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
            params: {profile: profile}
        });
        navigation.dispatch(resetAction);
    }

    async uploadProfilePicture(){
        if(this.state.image) {

            let uuid = firebase.auth().currentUser.uid;
            let storage = firebase.storage();
            let ref = storage.ref(uuid + "/pfp/" + this.state.uuid);

            let response = await fetch(this.state.image.uri);
            const blob = await response.blob();
            ref.put(blob)

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