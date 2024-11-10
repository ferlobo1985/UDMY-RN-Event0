import { createContext, useReducer, useState } from "react";
import { getUserEvents, getMoreEvents } from "../config/events.firebase";


export const AppContext = createContext();

const DEFAULT_EVENT = {
    events:[],
    lastVisible:''
}
function eventsReducer(state,action){
    switch(action.type){
        case 'HOME_EVENTS':
            return {
                lastVisible: action.payload.lastVisible,
                events: action.payload.events
            }
        case 'LOAD_MORE_EVENTS':
            return{
                lastVisible:action.payload.lastVisible,
                events:[...state.events,...action.payload.events]
            }
        default:
            return state
    }
}


export default function AppContextProvider({children}){
    const [eventState, dispatch] = useReducer(eventsReducer,DEFAULT_EVENT);
    const [user,setUser] = useState(null);

    const getHomeEvents = async() => {
        const response = await getUserEvents();
        dispatch({type:'HOME_EVENTS',payload:response})
    }

    const loadMoreEvents = async() =>{
        if(eventState.lastVisible){
            const response = await getMoreEvents(2,eventState.lastVisible);
            dispatch({type:'LOAD_MORE_EVENTS',payload:response})
        }
    }


    return(
        <AppContext.Provider value={{
            user,
            setUser,
            eventState,
            getHomeEvents,
            loadMoreEvents:loadMoreEvents
        }}>
            {children}
        </AppContext.Provider>
    )
}