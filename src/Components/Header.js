import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default function Header({navigation, title, onPressAdd}){

    const openMenu = () => {
        console.log(1);
        console.log(navigation.navigate("Login"));
    }

    return (

        <View style={styles.header}>

            <TouchableOpacity onPress={onPressAdd} style={styles.iconTouch}>
                <Ionicons name="add" size={30} style={{color: '#0000ff'}}/>
            </TouchableOpacity>
            <View style={styles.header}>

            <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    iconTouch:{
        position: 'absolute',
        left: 10,
        zIndex: 1
    }
})