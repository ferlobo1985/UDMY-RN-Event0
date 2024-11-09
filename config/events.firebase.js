import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AUTH, DB } from './firebase';
import Toast from 'react-native-root-toast';

let eventsCol = collection(DB,'events');

export const createEvent = async(formData) => {
    try{
        // GET USER
        const user = AUTH.currentUser;
        /// POST DOC
        const docRef = doc(eventsCol);
        // const id = docRef.id
        const eventData = {
            status:'pending',
            created_at: serverTimestamp(),
            owner:user.uid,
            ...formData
        };
        await setDoc(docRef,eventData);
        Toast.show('Event created');
        return eventData;
    } catch(e){
        Toast.show('Oops, try again');
        console.log(e)
    }
}