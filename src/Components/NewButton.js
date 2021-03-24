import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {globalStyles} from "../screens/GlobalStyles";

export default function NewButton({onPress, style = {alignSelf: 'center', color: 'gold'}}) {
    return (

        <TouchableOpacity style={globalStyles.newButton} onPress={onPress}>
            <Ionicons name={'add'} size={35} style={style}/>
        </TouchableOpacity>

    );
}