import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getEventById } from "../config/events.firebase";

export default function Event(props){
    const [ loading,setLoading ] = useState(true);
    const [ event,setEvent] = useState(null);
    const eventID = props.route.params.eventID;
    const isFocused = useIsFocused(); 


    useEffect(()=>{
        setLoading(true);
        isFocused && getEventById(eventID)
        .then((data)=>{
            setEvent(data)
            setLoading(false);
        })
    },[isFocused])
    

    return(
        <View style={styles.container}>
            { loading && <ActivityIndicator size="large"/>}
            { !loading && event && 
            <>
                <Text>{event.name}</Text>
            </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:20
    }
})