import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

export default function RecoverPassword({ navigation }) {
  const [email, setEmail] = useState("");
  
  const sendCode = async () => {
    try {
      const form = new FormData();
      form.append("emailCliente", email);

      const DATA = await fetchData("cliente", "emailPasswordSender", form);
      if (DATA.status) {
        Alert.alert("Código enviado", "Se ha enviado un código de recuperación al correo proporcionado.");
        navigation.navigate("confirmCode", { token: DATA.dataset }); // Pasar el token a la siguiente pantalla
      } else {
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar el código de recuperación.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapeTopLeft} />
      <View style={styles.backgroundShapeBottomRight} />
      <Text style={styles.title}>Recover Password</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Email address</Text>
        <Input
          placeholder="Enter Your Email here"
          setValor={email}
          setTextChange={setEmail}
        />
        <Buttons
          textoBoton="Send Code"
          accionBoton={sendCode}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backgroundShapeTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    backgroundColor: '#0066ff',
    borderBottomRightRadius: 100,
  },
  backgroundShapeBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#0066ff',
    borderTopLeftRadius: 50,
  },
  title: {
    fontSize: 32,
    color: '#4a4a4a',
    marginBottom: 20,
  },
  loginContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#4a4a4a',
  },
  backLink: {
    color: '#0066ff',
    marginTop: 20,
  },
});
