import { Formik, Field } from "formik";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from "react-native";

import { eventValidationSchema } from "./event.schema";
import CustomInput from "../utils/input.cutom";
import { AppStyle } from "../../constants";

import ButtonCustom from '../utils/button.custom' 
import { useState } from "react";


export default function CreateEventForm(){
    const [loading, setLoading ] = useState(false);

    const handleEventSubmit = async(values,resetForm) => {
        setLoading(true);
        /// firebase
        setLoading(false)

    }

    return(
      <KeyboardAvoidingView
        behavior={ Platform.OS === 'ios'?'padding':'position'}
        style={{flex:1}}
      >
        <ScrollView>
            <Formik
                initialValues={{name:'',description:'',date:'',time:'', priority:''}}
                onSubmit={(values,{ resetForm })=>{
                    handleEventSubmit(values,resetForm)
                }}  
                validationSchema={eventValidationSchema}
            >
            {({ handleSubmit, isValid })=>(
            <View style={{marginHorizontal:30,marginBottom:50,marginTop:20}}>

                <Field
                    component={CustomInput}
                    name="name"
                    placeholder="Name of the event"
                    autoCapitalize={true}
                />

                <Field
                    component={CustomInput}
                    name="description"
                    placeholder="Enter a description"
                    autoCapitalize={true}
                    multiline={true}
                    numberOfLines={5}
                />

                <Field
                    component={CustomInput}
                    name="date"
                    placeholder="The date (MM/DD/YYYY)"
                />

                <Field
                    component={CustomInput}
                    name="time"
                    placeholder="The time (00:00)"
                />

                <Field
                    component={CustomInput}
                    name="priority"
                    placeholder="Set the priority"
                />

                <View style={styles.btnContainer}>
                    { isValid && !loading &&
                        <ButtonCustom
                            title="Add event"
                            onPress={handleSubmit}
                        />
                    }
                    {loading && <ActivityIndicator/>}
                </View>

            </View>
            )}
            </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop:20,
        borderTopColor:AppStyle.purpStrong,
        borderTopWidth:1,
        paddingTop:20
    }
})