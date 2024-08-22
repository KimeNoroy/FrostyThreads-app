import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sesion from './src/screens/Sesion';
import Registro from './src/screens/Registro';
import Navigator from './src/navigation/Navigator';
import Productos from './src/screens/Productos';
import Home from './src/screens/Home';
import RecoverPassword from './src/screens/PasswordRecovery';
import ResetPassword from './src/screens/ResetPassword';
import confirmCode from './src/screens/confirmCode';
import History from './src/screens/History';

import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import * as SplashScreen from 'expo-splash-screen';
import Preview from './src/screens/Preview';
import DetalleOrden from './src/screens/DetalleOrden';

const Stack = createNativeStackNavigator();


export default function App() {

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sesion"
       screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Navigator" component={Navigator} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="PasswordRecovery" component={RecoverPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="confirmCode" component={confirmCode} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="DetalleOrden" component={DetalleOrden} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
