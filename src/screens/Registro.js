import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, StyleSheet, Alert } from 'react-native';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setClave] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [correo, setEmail] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handlerRegistro = async () => {
    try {
      const form = new FormData();
      form.append("nombreCliente", nombre);
      form.append("apellidoCliente", apellido);
      form.append("claveCliente", contrasenia);
      form.append("emailCliente", correo);
      form.append("estadoCliente", 1);
      form.append("confirmarClave", confirmarContrasenia);

      const DATA = await fetchData("cliente", "signUpMovil", form);
      if (DATA.status) {
        Alert.alert("Bienvenido!", "Cuenta registrada satisfactoriamente");
        setClave("");
        setApellido("");
        setNombre("");
        setEmail("");
        setConfirmarContrasenia("");
        navigation.replace("Sesion");
      } else {
        console.log(DATA.error);
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigateSesion = async () => {
    navigation.replace("Sesion")
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapeTopLeft} />
      <View style={styles.backgroundShapeBottomRight} />
      <Text style={styles.title}>SIGN-UP</Text>
      <View style={styles.signupContainer}>
        <Input 
          placeholder="Enter Your Name" 
          setValor={nombre}
          setTextChange={setNombre}
        />
        <Input 
          placeholder="Enter Your Last Name" 
          setValor={apellido}
          setTextChange={setApellido}
        />
        <Input 
          placeholder="Please Enter Your Email" 
          setValor={correo}
          setTextChange={setEmail}
        />
        <Input 
          placeholder="Please Enter Your Password" 
          setValor={contrasenia}
          setTextChange={setClave}
          contra = {true}
        />
        <Input 
          placeholder="Confirm Password" 
          setValor={confirmarContrasenia}
          setTextChange={setConfirmarContrasenia}
          contra = {true}
        />
        <Buttons
          textoBoton="Register!" 
          accionBoton={handlerRegistro}
        />
        <TouchableOpacity onPress={navigateSesion}>
          <Text style={styles.registerText}>
            If you already have an account? <Text style={styles.registerLink}>Login Now</Text>
          </Text>
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
  signupContainer: {
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
  forgotPassword: {
    color: '#555',
    fontSize: 12,
    marginVertical: 10,
  },
  registerText: {
    color: '#555',
    fontSize: 12,
    marginVertical: 20,
  },
  registerLink: {
    color: '#0066ff',
  },
});
