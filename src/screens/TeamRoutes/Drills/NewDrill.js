import React, {useState} from "react";
import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WebViewQuillJS from 'react-native-webview-quilljs'




const NewDrill = () => {
    const [html, setHTML] = useState(null);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <WebViewQuillJS
                onMessageReceived={setHTML}
                backgroundColor={"#FAEBD7"}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginTop: 36
    },
    toolbarContainer: {
        height: 56,
        flexDirection: "row",
        backgroundColor: "silver",
        alignItems: "center",
        justifyContent: "space-around"
    },
    controlButtonContainer: {
        padding: 8,
        borderRadius: 2
    }
});

export default NewDrill;