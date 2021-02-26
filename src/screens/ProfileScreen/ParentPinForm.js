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
        Pin: yup.string().required().min(4).max(4)
            .test('isNumber', "Pin must be a 4 digit number", val => {
                return !/[a-zA-Z]/g.test(val);
            })
            .test('isProfilePin', "This pin does not match this profile's existing pin", val => {
                if(profile.isParent){
                    return profile.getParentPin() === val;
                }else return true;
            })
    })

    return(
        
        <View style={{flex: 1, padding: 20, top: 30, justifyContent: 'center', backgroundColor: colors.background}}>
            
            <Formik initialValues={{Pin: ''}}
                    validationSchema={InputSchema}
                    onSubmit={(values, actions) => {
                        onSubmit(values);
                        actions.resetForm();
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
                                       onChangeText={formikProps.handleChange('Pin')}
                            />
                            <Text style={{...globalStyles.errorText, color: 'white'}}>{formikProps.touched.Pin && formikProps.errors.Pin}</Text>

                            <FlatButton text={"Submit"} onPress={formikProps.handleSubmit}/>

                        </View>

                    )
                }}

            </Formik>
            
        </View>
        
    )

}