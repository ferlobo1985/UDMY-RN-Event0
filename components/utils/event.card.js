import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppStyle } from "../../constants";

import TagComp from "./tag";

export default function EventCard({item,eventPressHandler}){
    return(
        <Pressable
            style={styles.container}
            // onPress={()=> eventPressHandler(item)}
        >
            <LinearGradient
                colors={['#ffffff','#eeeeee']}
                style={styles.itemGradient}
            >
                {/* HEADER */}
                <View style={styles.itemHeader}>
                    <Text style={{fontFamily:'Anton',flex:2, fontSize:25}}>
                        {item.name}
                    </Text>
                    <TagComp
                        priority={item.priority}
                    />
                </View>



           
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginVertical:10
    },
    itemGradient:{
        borderWidth:1,
        borderRadius:10,
        borderColor:'#E6E6E6'
    },
    itemHeader:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:AppStyle.purpLight,
        borderBottomWidth:1
    }
})