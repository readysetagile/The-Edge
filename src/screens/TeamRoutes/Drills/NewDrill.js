import React, { useRef, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import {
    actions,
    defaultActions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";
import HTMLView from "react-native-htmlview";

const NewDrill = () => {
     const strikethrough = null//require("./assets/strikethrough.png"); //icon for strikethrough
     const video = null//require("./assets/video.png"); //icon for Addvideo
    const RichText = useRef(); //reference to the RichEditor component
    const [article, setArticle] = useState("");

    // this function will be called when the editor has been initialized
    function editorInitializedCallback() {
        RichText.current?.registerToolbar(function (items) {
            // items contain all the actions that are currently active
            console.log(
                "Toolbar click, selected items (insert end callback):",
                items
            );
        });
    }

    // Callback after height change
    function handleHeightChange(height) {
        // console.log("editor height change:", height);
    }

    function onPressAddImage() {
        // you can easily add images from your gallery
        RichText.current?.insertImage(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
        );
    }

    function insertVideo() {
        // you can easily add videos from your gallery
        RichText.current?.insertVideo(
            "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Editor</Text>
            <RichEditor
                disabled={false}
                containerStyle={styles.editor}
                ref={RichText}
                style={styles.rich}
                placeholder={"Start Writing Here"}
                onChange={(text) => setArticle(text)}
                editorInitializedCallback={editorInitializedCallback}
                onHeightChange={handleHeightChange}
            />
            <RichToolbar
                style={[styles.richBar]}
                editor={RichText}
                disabled={false}
                iconTint={"purple"}
                selectedIconTint={"pink"}
                disabledIconTint={"purple"}
                onPressAddImage={onPressAddImage}
                iconSize={40}
                actions={[
                    "insertVideo",
                    ...defaultActions,
                    actions.setStrikethrough,
                    actions.heading1,
                ]}
                // map icons for self made actions
                iconMap={{
                    [actions.heading1]: ({ tintColor }) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                    ),
                    [actions.setStrikethrough]: strikethrough,
                    ["insertVideo"]: video,
                }}
                insertVideo={insertVideo}
            />
            <Text style={styles.text}>Result</Text>
            <HTMLView value={article} stylesheet={styles} />
        </ScrollView>
    );
};

export default NewDrill;

const styles = StyleSheet.create({
    /********************************/
    /* styles for html tags */
    a: {
        fontWeight: "bold",
        color: "purple",
    },
    div: {
        fontFamily: "monospace",
    },
    p: {
        fontSize: 30,
    },
    /*******************************/
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#F5FCFF",
    },
    editor: {
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: 1,
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    richBar: {
        height: 50,
        backgroundColor: "#F5FCFF",
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
    },
    tib: {
        textAlign: "center",
        color: "#515156",
    },
});

/*
export default class NewDrill extends Component {

         // strikethrough = require("./assets/strikethrough.png"); //icon for strikethrough
         // video = require("./assets/video.png"); //icon for Addvideo
          RichText = useRef(); //reference to the RichEditor component
         // [article, setArticle] = useState("");

        // this function will be called when the editor has been initialized
         editorInitializedCallback() {
            this.RichText.current?.registerToolbar(function (items) {
                // items contain all the actions that are currently active
                console.log(
                    "Toolbar click, selected items (insert end callback):",
                    items
                );
            });
        }

        // Callback after height change
         handleHeightChange(height) {
            // console.log("editor height change:", height);
        }

         onPressAddImage() {
            // you can easily add images from your gallery
             this.RichText.current?.insertImage(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
            );
        }

         insertVideo() {
            // you can easily add videos from your gallery
             this.RichText.current?.insertVideo(
                "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
            );
        }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Editor</Text>
                <RichEditor
                    disabled={false}
                    containerStyle={styles.editor}
                    ref={this.RichText}
                    style={styles.rich}
                    placeholder={"Start Writing Here"}
                    onChange={(text) => setArticle(text)}
                    editorInitializedCallback={editorInitializedCallback}
                    onHeightChange={handleHeightChange}
                />
                <RichToolbar
                    style={[styles.richBar]}
                    editor={this.RichText}
                    disabled={false}
                    iconTint={"purple"}
                    selectedIconTint={"pink"}
                    disabledIconTint={"purple"}
                    onPressAddImage={this.onPressAddImage}
                    iconSize={40}
                    actions={[
                        "insertVideo",
                        ...defaultActions,
                        actions.setStrikethrough,
                        actions.heading1,
                    ]}
                    // map icons for self made actions
                    iconMap={{
                        [actions.heading1]: ({ tintColor }) => (
                            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                        ),
                        [actions.setStrikethrough]: strikethrough,
                        ["insertVideo"]: video,
                    }}
                    insertVideo={this.insertVideo}
                />
                <Text style={styles.text}>Result</Text>
                <HTMLView value={this.article} stylesheet={styles} />
            </ScrollView>
        )
    }
}
 */
