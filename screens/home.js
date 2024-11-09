import { FlatList, StyleSheet, Text, View } from "react-native";
import AddEventButton from "../components/utils/addEventButton";
import { useContext, useEffect } from "react";
import { AppContext } from "../store/appContext";

export default function Home(){
    const context = useContext(AppContext);


    useEffect(()=>{
        context.getHomeEvents();
    },[])



    return(
        <View style={styles.container}>
            { context.eventState.events &&
                <FlatList
                    data={context.eventState.events}
                    renderItem={({item})=>(
                        <Text>{item.name}</Text>
                    )}
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