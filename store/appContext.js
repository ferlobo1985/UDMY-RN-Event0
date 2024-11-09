import { createContext, useState } from "react";
import { getUserEvents } from "../config/events.firebase";


export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [user,setUser] = useState(null);

    const getHomeEvents = async() => {
        const response = await getUserEvents();
        console.log(response)
    }


    return(
        <AppContext.Provider value={{
            user,
            setUser,
            getHomeEvents
        }}>
            {children}
        </AppContext.Provider>
    )
}