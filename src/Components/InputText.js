import React from 'react';
import Dialog from "react-native-dialog";

export default function InputText({
                                      visible,
                                      onBackDropPress,
                                      title,
                                      description,
                                      placeholder,
                                      onTextChange,
                                      onSubmit,
                                      onCancel
                                  }) {

    return (

        <Dialog.Container visible={visible} onBackdropPress={onBackDropPress}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>
                {description}
            </Dialog.Description>
            <Dialog.Input placeholder={placeholder} onChangeText={onTextChange}/>
            <Dialog.Button label="Cancel" onPress={onCancel}/>
            <Dialog.Button label="Done" onPress={onSubmit}/>
        </Dialog.Container>

    )
}