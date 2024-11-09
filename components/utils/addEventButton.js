import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"
import { AppStyle } from '../../constants';
import { useNavigation } from "@react-navigation/native";


export default function AddEventButton(){
    const navigation  = useNavigation();

    return(
        <Pressable
            onPress={()=> navigation.navigate('Create Event')}
            style={({pressed})=>[
                styles.container,
                styles.shadow,
                { backgroundColor: pressed ? AppStyle.airForce:AppStyle.gunMetal}
            ]}
        >
            <Ionicons name="add-outline" size={50} color="white"/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        width:60,
        height:60,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:AppStyle.airForce,
        borderRadius:10,
        position:'absolute',
        bottom:40,
        right:40
    },
    shadow:{
        shadowColor:'black',
        shadowOffset:{
            width:7,
            height:-7
        },
        shadowRadius:5,
        shadowOpacity:0.3
    }
})