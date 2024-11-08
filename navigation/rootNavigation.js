import { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { AppContext } from "../store/appContext";

/// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./navigation";


// FIREBASE 
import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "../config/firebase";



export default function RootNavigator(){
    const [ loading, setLoading ] = useState(true);
    const { user, setUser} = useContext(AppContext)

    useEffect(()=>{
        onAuthStateChanged(AUTH,async(user)=>{
            user ? setUser(user) : setUser(null);
            setLoading(false)
        })
    },[user]);


    if(loading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

    return(
        <NavigationContainer>
            { user ? <Text> NORMAL STACK </Text> : <AuthStack/>}
        </NavigationContainer>
    )
}