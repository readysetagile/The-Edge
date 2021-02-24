import React from 'react';
import {Formik} from 'formik';
import {Text, TextInput, View} from 'react-native';
import styles from "./styles";
import * as yup from 'yup';
import {globalStyles} from '../GlobalStyles';
import colors from "../styles";
import FlatButton from "../../Components/SubmitButton";



export default function InputParentPin({profile, text, onSubmit}){

    const InputSchema = yup.object({
        Pin: yup.string().required().min(4)
            .test('isNumber', "Pin must be a 4 digit number", val => {
                return !isNaN(parseInt(val));
            })
            .test('isProfilePin', "This pin does not match this profile's existing pin", val => {
                return profile.isParent && profile.getParentPin() === val;
            })
    })

    return(
        
        <View style={{flex: 1, padding: 20, top: 30, justifyContent: 'center', backgroundColor: colors.background}}>
            
            <Formik initialValues={{Pin: ''}}
                    validationSchema={InputSchema}
                    onSubmit={(values, actions) => {
                actions.resetForm();
                onSubmit();
            }}>

                {(formikProps) => {
                    return(

                        <View>

                            <Text style={globalStyles.title}>Parent Pin</Text>
                            <Text style={{fontSize: 20, textAlign: 'left', left: 20, fontWeight: 'bold'}}>{text}</Text>
                            <TextInput style={globalStyles.inputView}
                                       placeholder="1234"
                                       placeholderTextColor="white"
                                       onBlur={formikProps.handleBlur('Pin')}
                                       onTextChange={formikProps.handleChange('Pin')}
                            />
                            <Text style={globalStyles.errorText}>{formikProps.touched.Pin && formikProps.errors.Pin}</Text>

                            <FlatButton text={"Submit"} onPress={formikProps.handleSubmit}/>

                        </View>

                    )
                }}

            </Formik>
            
        </View>
        
    )

}