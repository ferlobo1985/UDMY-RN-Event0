import { useState } from "react";
import { Alert, Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AppStyle } from "../constants";


export default function AuthScreen(){
    const [ type, setType] = useState(true);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('')

    const handleAuth = () => {
        Alert.alert('AUTH')
    }
    
    return(
        <LinearGradient
            style={styles.container}
            colors={[AppStyle.purpStrong, AppStyle.purpMedium]}
        >
            <SafeAreaView style={styles.form}>

                <Text style={styles.title}>
                    { type ? 'Sign up':'Sign in'}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text)=> setEmail(text)}
                />


                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text)=> setPassword(text)}
                />

                <Button
                    title={ type ? 'Sign up':'Sign in'}
                    onPress={handleAuth}
                />

                <Pressable
                    style={{ flexDirection:'row'}}
                    onPress={()=> setType(!type)}
                >
                    <Text style={styles.typeText}>
                        {!type ?
                        'Don\'t have an account ?':
                        'Already have an account ?'
                        }
                    </Text>
                    <Text style={[styles.typeText, { fontWeight:'bold'}]}>
                        {!type ?
                        ' Sign up':
                        ' Sign in'
                        }
                    </Text>
                </Pressable>


            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    form:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:40,
    },
    title:{
        fontFamily:'Anton',
        fontSize:50,
        fontWeight:'bold',
        color:'#fff',
        paddingBottom:20
    },
    input:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:AppStyle.purpMedium,
        height:50,
        marginBottom:20,
        fontSize:20,
        borderRadius:8,
        padding:10
    },
    typeText:{
        fontSize:20,
        marginTop:20,
        color:'#fff'
    }
})