import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer";

/// SCREEN
import Home from '../screens/home';
import Event from '../screens/event';
import CreateEvent from '../screens/events/create';
import EditEvent from '../screens/events/edit';
import CompletedEvents from '../screens/completed';
import AuthScreen from "../screens/auth";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Auth" component={AuthScreen}/>
        </Stack.Navigator>
    )
}

function DrawerNavigator(){
    return(
    <Drawer.Navigator>
        <Drawer.Screen name="home_events" component={Home} 
            options={{title:'Events'}}
        />
        <Drawer.Screen name="completed" component={CompletedEvents}/>
    </Drawer.Navigator>
    )
}

export function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={DrawerNavigator}
                options={{headerShown:false}}
            />
            <Stack.Screen name="Event" component={Event}/>
            <Stack.Screen name="Create Event" component={CreateEvent}/>
            <Stack.Screen name="Edit Event" component={EditEvent}/>
        </Stack.Navigator>
    )
}
