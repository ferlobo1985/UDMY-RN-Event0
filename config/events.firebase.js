import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, limit, where, startAfter, getDoc, updateDoc } from 'firebase/firestore';
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

export const updateEvent = async(id,formData) => {
    try{
        const docRef = doc(DB,'events',id);
        await updateDoc(docRef,{
            ...formData
        });
        // Toast.show('Event updated');
        return true;
    } catch(e){
        Toast.show('Oops, try again');
    }
}

export const getUserEvents = async(docLimit=4) =>{
    try{
        const user = AUTH.currentUser;
        const q = query(
            eventsCol,
            orderBy('created_at','desc'),
            where('owner','==', user.uid),
            where('status','==','pending'),
            limit(docLimit)
        );
        const querySnapshot = await getDocs(q);
        const events = getMoreHelper(querySnapshot);

        return {
            ...events
        }
    } catch(e){
        console.log(e)
    }
}

export const getMoreEvents = async(docLimit=2,lastVisible)=>{
    try{
        const user = AUTH.currentUser;
        const q = query(
            eventsCol,
            orderBy('created_at','desc'),
            where('owner','==', user.uid),
            where('status','==','pending'),
            startAfter(lastVisible),
            limit(docLimit)
        );
        const querySnapshot = await getDocs(q);
        const events = getMoreHelper(querySnapshot);

        return {
            ...events
        }
    }catch(e){
        console.log(e)
    }
}

function getMoreHelper(querySnapshot){
    let lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    const events = querySnapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
    }));

    if(lastVisible === undefined || lastVisible === null){
        lastVisible = false;
    }

    return {
        events,
        lastVisible
    }
}

export const getEventById = async(id) => {
    try{
        const docRef = await getDoc(doc(DB,'events',id));
        if(!docRef.exists()){
            Toast.show('Could not find document');
        }
        return docRef.data();
    } catch(e){
        console.log(e)
    }
}