import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

export default function Sesion({ navigation }) {
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
        // Navega a la siguiente pantalla o ruta en la aplicación
        await handlerLogin();
      } else {
        console.log(DATA.error);
        Alert.alert("Error", DATA.error);
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
    }
  };

  const handlerLogin = async () => {
    try {
      // Crea un formulario FormData con los datos de usuario y contraseña
      const form = new FormData();
      form.append("emailCliente", correo);
      form.append("claveCliente", contrasenia);

      // Realiza una solicitud para iniciar sesión usando fetchData
      const DATA = await fetchData("cliente", "logIn", form);
      console.log(DATA)
      // Verifica la respuesta del servidor
      if (DATA.status) {
        Alert.alert("Bienvenido!", "Cuenta registrada satisfactoriamente");
        setClave("");
        setApellido("");
        setNombre("");
        setCorreo("");
        setConfirmarContrasenia("");
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // o el valor de desplazamiento adecuado
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // restablecer el valor de desplazamiento
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigateSesion = async () => {
    navigation.replace("Sesion")
  };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>SIGN-UP</Text>
          <Input
            placeHolder="Enter Your Name"
            setValor={nombre}
            setTextChange={setNombre}
          />
          <Input
            placeHolder="Enter Your last name"
            setValor={apellido}
            setTextChange={setApellido}
          />
          <Input
            placeHolder="Please Enter Your Email"
            setValor={correo}
            setTextChange={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeHolder="Please Enter Your Password"
            setValor={contrasenia}
            setTextChange={setClave}
            contra={true}
          />
          <Input
            placeHolder="Confirm Password"
            setValor={confirmarContrasenia}
            setTextChange={setConfirmarContrasenia}
            contra={true}
          />
          <Buttons textoBoton="check in!" accionBoton={handlerRegistro} />
          <TouchableOpacity style={styles.textPositioner}>
            <Text style={styles.loginText} onPress={navigateSesion} >
              Do you already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5B7FDA',
  },
  textPositioner: {
    marginTop: 25,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#5B7FDA',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#010101',
    textAlign: 'center',
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
  },
  loginLink: {
    color: '#5B7FDA',
    fontWeight: 'bold',
  },
});
