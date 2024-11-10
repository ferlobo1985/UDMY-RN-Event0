import { Formik, Field } from "formik";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from "react-native";

import { eventValidationSchema } from "./event.schema";
import CustomInput from "../utils/input.cutom";
import { AppStyle } from "../../constants";
import Toast from "react-native-root-toast";

import ButtonCustom from '../utils/button.custom' 
import { useState } from "react";

// firebase
import { createEvent, updateEvent } from "../../config/events.firebase";


export default function EditEventForm({event}){
    const [loading, setLoading ] = useState(false);

    const handleEventSubmit = async(values,resetForm) => {
        setLoading(true);
        await updateEvent(event.id,values).finally(()=>{
            setLoading(false);
            Toast.show('Event updated');
        })
    }

    return(
      <KeyboardAvoidingView
        behavior={ Platform.OS === 'ios'?'padding':'position'}
        style={{flex:1}}
      >
        <ScrollView>
            <Formik
                initialValues={{
                    name:event.name,
                    description:event.description,
                    date:event.date,
                    time:event.time, 
                    priority:event.priority
                }}
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
                            title="Edit event"
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