import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const InputPerfil = ({ placeHolder, setValor, setTextChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeHolder}</Text>
      <TextInput 
        style={styles.input} 
        placeholder={placeHolder} 
        placeholderTextColor="#aaa"
        value={setValor}
        onChangeText={setTextChange} // Usa esta función para actualizar el estado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#4a4a4a',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
  },
});

export default InputPerfil;
