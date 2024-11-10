import { FlatList, StyleSheet, Text, View } from "react-native";
import AddEventButton from "../components/utils/addEventButton";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/appContext";

import EventCard from '../components/utils/event.card'
import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const context = useContext(AppContext);
    const [refreshing,setRefreshing] = useState(false);
    const navigation = useNavigation();


    useEffect(()=>{
        context.getHomeEvents();
    },[])


    const eventPressHandler = (item) => {
        navigation.navigate('Event',{
            eventID: item.id
        })
    }

    const onRefresh = async()=>{
        setRefreshing(true)
        await context.getHomeEvents().then(()=>{
            setRefreshing(false)
        });
    }


    return(
        <View style={styles.container}>
            { context.eventState.events &&
                <FlatList
                    data={context.eventState.events}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({item})=>(
                        <EventCard
                            eventPressHandler={()=> eventPressHandler(item)}
                            item={item}
                        />
                    )}
                    keyExtractor={(item)=>item.id}
                />
            }

            <AddEventButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})