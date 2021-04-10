import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default function HeaderBurgerNav({title, onPress, leftSide=true}) {
    return (

        <View style={styles.header}>

            <TouchableOpacity onPress={onPress} style={(leftSide ? styles.iconTouchLeft : styles.iconTouchRight)}>
                <Ionicons name="menu" size={30} style={{color: '#0000ff'}}/>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1
    },
    iconTouchLeft: {
        position: 'absolute',
        left: 10,
        zIndex: 1
    },
    iconTouchRight: {
        position: 'absolute',
        right: 0,
        zIndex: 1
    }
});