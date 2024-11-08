import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { AUTH, DB } from './firebase'
import { Alert } from 'react-native';

export const signUpUser = async(email, password) =>{
    try{
        /// sign up user
        const request = await createUserWithEmailAndPassword(AUTH,email,password);
        await addUserToFirestore(request.user)

        Alert.alert('Welcome !!')
    }catch(e){
        Alert.alert(e);
    }
}

export const signInUser = async(email,password) =>{
    try{
        await signInWithEmailAndPassword(AUTH,email,password);
        Alert.alert('Welcome back!!')
    } catch(e){
        Alert.alert(e);
    }
}


export const addUserToFirestore= async(user) =>{
    try{
        const newUser = {
            uid: user.uid,
            email: user.email,
            firstname:'',
            lastname:''
        }
        await setDoc(doc(DB,'users',user.uid),newUser);
    }catch(e){
        Alert.alert(e);
    }

}