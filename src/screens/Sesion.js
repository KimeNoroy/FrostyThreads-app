import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import fetchData from '../utils/fetchdata';
import Input from "../components/Inputs/Input";
import InputEmail from "../components/Inputs/InputsEmail";
import Buttons from "../components/Buttons/Button";


export default function Sesion({ navigation }) {
  const [isContra, setIsContra] = useState(true);
  const [email, setEmail] = useState("");
  const [contrasenia, setClave] = useState("");

  const validarSesion = async () => {
    try {
      const DATA = await fetchData("cliente", "getUser");
      if (DATA.session) {
        // cerrarSesion();
        // console.log("Se eliminó la sesión");

        setClave("");
        setEmail("");
        // Navega a la siguiente pantalla o ruta en la aplicación
        navigation.replace("Navigator");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al validar la sesión");
    }
  };

  const cerrarSesion = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut");

      if (DATA.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log("No se pudo eliminar la sesión");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión con bryancito");
    }
  };

  const handlerLogin = async () => {
    try {
      // Crea un formulario FormData con los datos de usuario y contraseña
      const form = new FormData();
      form.append("emailCliente", email);
      form.append("claveCliente", contrasenia);

      // Realiza una solicitud para iniciar sesión usando fetchData
      const DATA = await fetchData("cliente", "logIn", form);

      // Verifica la respuesta del servidor
      if (DATA.status) {
        // Limpia los campos de usuario y contraseña
        setClave("");
        setEmail("");
        // Navega a la siguiente pantalla o ruta en la aplicación
        navigation.replace("Navigator");
      } else {
        // Muestra una alerta en caso de error
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);
      }
    } catch (error) {
      // Maneja errores que puedan ocurrir durante la solicitud
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  const navigateRegistrar = async () => {
    navigation.replace("Registro")
  };

  const decirhola = async () => {
    console.log("hola");
  };

  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <InputEmail
            placeHolder="Email"
            setValor={email}
            setTextChange={setEmail}
          />
       <Input
            placeHolder="Contraseña"
            setValor={contrasenia}
            setTextChange={setClave}
            contra={isContra}
          />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Buttons textoBoton="Iniciar Sesión" accionBoton={handlerLogin} />
  
      <Text style={styles.register}>
        if you havn't Registered yet ?
       <TouchableOpacity style={styles.textPositioner} onPress={navigateRegistrar}>
        <Text style={styles.registerLink}> Register Now  </Text>
          </TouchableOpacity>
      </Text>
    </View>
  );
};

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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#5a67d8',
    marginTop: 10,
  },
  register: {
    color: '#888',
    marginTop: 20,
  },
  registerLink: {
    color: '#5a67d8',
    fontWeight: 'bold',
  },
});


