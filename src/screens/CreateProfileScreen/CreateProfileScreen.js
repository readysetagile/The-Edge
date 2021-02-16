import React, {Component, useState} from 'react';
import {View, Image, Text, TextInput} from 'react-native';
import styles from './styles';
import {DEFAULTAVATR} from "../../firebase/modules/profiles";
import {TouchableOpacity} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
    SafeAreaView,
    StyleSheet,
    Platform,
    Alert,
} from 'react-native';

//import ImagePicker from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';

// const [image, setImage] = useState(null);
// const [uploading, setUploading] = useState(false);
// const [transferred, setTransferred] = useState(0);


export default class CreateProfileScreen extends Component{


    async uploadImage(){



    }

    selectImage(){

        const options = {
            mediaType: 'photo',
            maxWidth: 2000,
            maxHeight: 2000,
            title: "Select pfp"
        };

        launchImageLibrary(options, res => {

        })

        // ImagePicker.showImagePicker(options, response => {
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         const source = { uri: response.uri };
        //         console.log(source);
        //         setImage(source);
        //     }
        // });

    }

    render(){
        return(

            <View style={styles.background}>


                    <TouchableOpacity onPress={() => this.selectImage()}>
                        <View style={{alignItems: 'center', padding: 40}}>

                            <Image style={styles.avatar} source={{uri: DEFAULTAVATR}}/>
                            <Text style={{
                                fontSize: 20,
                                top: 5
                            }}>Upload Image</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                        >Username</TextInput>
                    </View>

                    <TouchableOpacity onPress={this.onCreateAccount} style={styles.createProfileButton}>
                        <Text style={{color: 'white', fontSize: 20}}>Create Profile</Text>
                    </TouchableOpacity>

            </View>

        );

    }


}