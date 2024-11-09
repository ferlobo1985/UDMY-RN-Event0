import { Formik, Field } from "formik";
import { KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";

import { eventValidationSchema } from "./event.schema";
import CustomInput from "../utils/input.cutom";

export default function CreateEventForm(){

    const handleSubmit = async(values,resetForm) => {

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
                    handleSubmit(values,resetForm)
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



            </View>
            )}
            </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}