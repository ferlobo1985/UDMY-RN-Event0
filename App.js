import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


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
    <View>
      <Text>here</Text>
    </View>
  );
}

