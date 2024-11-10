import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getEventById } from "../config/events.firebase";
import TagComp from "../components/utils/tag";
import { AppStyle } from "../constants";

import ButtonCustom from '../components/utils/button.custom';


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
                {/* HEADER */}
                <View style={styles.contentHeader}>
                    <Text>{event.date}, {event.time}</Text>
                    <TagComp
                        priority={event.priority}
                    />
                </View>

                {/* BODY */}
                <View>
                    <Text style={styles.contentTitle}>
                        {event.name}
                    </Text>
                    <Text style={{fontSize:20}}>
                        {event.description}
                    </Text>
                </View>


                 {/* FOOTER */}
                 <View style={styles.contentFooter}>
                    <ButtonCustom
                        title="Edit event"
                        onPress={()=> props.navigation.navigate('Edit Event',{
                            event: { id: eventID,...event}
                        }) }
                    />
                 </View>
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
    },
    contentHeader:{
        paddingVertical:10,
        borderBottomColor:AppStyle.purpLight,
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    contentTitle:{
        fontFamily:'Anton',
        fontSize:30,
        marginVertical:20
    },
    contentFooter:{
        marginVertical:20,
        paddingVertical:20,
        borderTopColor:AppStyle.purpLight,
        borderTopWidth:1
    }
})