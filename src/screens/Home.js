import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home({ route }) {
  // Asegurarse de que route.params.userName no sea undefined antes de usarlo
  const userName = route.params?.userName || 'Usuario';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido de nuevo, {userName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5a67d8',
    marginBottom: 20,
  },
});
