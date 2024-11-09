import { Formik } from "formik";
import { KeyboardAvoidingView, Platform, Text, ScrollView, View} from "react-native";

import { eventValidationSchema } from "./event.schema";

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

                    

            </View>
            )}
            </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}