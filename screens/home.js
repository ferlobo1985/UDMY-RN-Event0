import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import AddEventButton from "../components/utils/addEventButton";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/appContext";

import EventCard from '../components/utils/event.card'
import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const context = useContext(AppContext);
    const [loading, setLoading] = useState(false);
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

    const loadMoreArticles = async()=>{
        setLoading(true);
        await context.loadMoreEvents().then(()=>{
            setLoading(false)
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
                    onEndReached={()=>{ !loading && loadMoreArticles()}}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={()=>( loading && <ActivityIndicator/>)}
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