import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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
        form.append("usuario_nombre", nombre);
        form.append("usuario_apellido", apellido);
        form.append("usuario_contraseña", contrasenia);
        form.append("usuario_correo", correo);
        form.append("usuario_estado", 1);
        form.append("confirmar_contraseña", confirmarContrasenia);

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
      form.append("usuario_correo", correo);
      form.append("usuario_contraseña", contrasenia);

      // Realiza una solicitud para iniciar sesión usando fetchData
      const DATA = await fetchData("cliente", "logIn", form);
        console.log(DATA)
      // Verifica la respuesta del servidor
      if (DATA.status) {
        Alert.alert("Bienvenido!", "Cuenta registrada satisfactoriamente");
        setContrasenia("");
        setUsuario("");
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
    <View style={styles.container}>
      <Text style={styles.title}>SIGN-UP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Please Enter Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Please Enter Your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign-up</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        if you already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => Alert.alert('Login')}>
          Login Now
        </Text>
      </Text>
    </View>
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
    color: '#fff',
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
