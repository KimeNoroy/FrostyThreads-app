import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import Perfil from '../screens/Perfil';
import Activity from '../screens/Activity';
import History from '../screens/History';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (

<Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header
        tabBarActiveTintColor: '#000', // Color de los íconos activos
        tabBarInactiveTintColor: '#004CFF', // Color de los íconos inactivos
        tabBarStyle: { backgroundColor: '#FFF', height: 60, borderTopWidth: 0 }, // Estilo de la barra de pestañas
        tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if(route.name == 'History'){
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="Carrito"
        component={Carrito}
        options={{ title: '' }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: '' }}
      />
    </Tab.Navigator>
    );
};

export default TabNavigator;