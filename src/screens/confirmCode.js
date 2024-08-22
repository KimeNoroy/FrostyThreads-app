import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

export default function ConfirmCode({ navigation, route }) {
  const { token } = route.params; // Recibimos el token de la primera pantalla
  const [code, setCode] = useState("");

  const sendCode = async () => {
    try {
        const formData = new FormData();
        formData.append('token', token); // Asegúrate de que el token se está pasando correctamente
        formData.append('secretCode', code);
        const result = await fetchData('cliente', 'emailPasswordValidator', formData);

        if (result.status) {
            Alert.alert("Código verificado", "El código es correcto. Proceda a restablecer su contraseña.");
            navigation.navigate("ResetPassword", { token: result.dataset });
        } else {
            Alert.alert("Error", result.message || "El código ingresado es incorrecto. Por favor, inténtelo nuevamente.");
        }
    } catch (error) {
        console.error("Error verifying code:", error.message);
        Alert.alert("Error", "Ocurrió un error al verificar el código.");
    }
}

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapeTopLeft} />
      <View style={styles.backgroundShapeBottomRight} />
      <Text style={styles.title}>Enter the code</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Code</Text>
        <Input
          value={code}
          setTextChange={setCode}
          placeholder="Enter the code sent to your email"
        />
        <Buttons
          textoBoton="Verify Code"
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
    marginBottom: 10,
  },
  backLink: {
    color: '#0066ff',
    marginTop: 20,
  },
});
