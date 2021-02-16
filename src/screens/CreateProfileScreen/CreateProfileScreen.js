import React, {Component} from 'react';
import {View, Image, Text, TextInput} from 'react-native';
import styles from './styles';
import {DEFAULTAVATR} from "../../firebase/modules/profiles";
import {TouchableOpacity} from "react-native";

const options = {
    title: "Select Avatar",
    storageOptions:{
        skipBackup: true,
        path: 'images'
    }
}

export default class CreateProfileScreen extends Component{

    pickImage(){



    }

    render(){
        return(

            <View style={styles.background}>

                    <TouchableOpacity onPress={() => this.pickImage()}>
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