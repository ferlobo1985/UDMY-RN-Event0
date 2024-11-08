import { useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import AppContextProvider from './store/appContext';
import RootNavigator from './navigation/rootNavigation';

/// FONTS
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded,error] = useFonts({
    'Pacifico':require('./assets/fonts/Pacifico.ttf'),
    'Anton':require('./assets/fonts/Anton.ttf'),
  });

  useEffect(()=>{
    if(loaded || error){
      SplashScreen.hideAsync();
    }
  },[loaded,error])
  if(!loaded && !error) { return null}


  return (
    <AppContextProvider>
      <RootSiblingParent>
        <RootNavigator/>
      </RootSiblingParent>
    </AppContextProvider>
  );
}

