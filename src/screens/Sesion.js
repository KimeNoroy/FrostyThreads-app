import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import fetchData from '../utils/fetchdata';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";

export default function Sesion({ navigation }) {
  const [isContra, setIsContra] = useState(true);
  const [email, setEmail] = useState("");
  const [contrasenia, setClave] = useState("");

  const validarSesion = async () => {
    try {
      const DATA = await fetchData("cliente", "getUser");
      if (DATA.session) {
        setClave("");
        setEmail("");
        navigation.replace("Navigator");
      } else {
        console.log("No hay sesión activa");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al validar la sesión");
    }
  };

  const handlerLogin = async () => {
    try {
      const form = new FormData();
      console.log(email);
      form.append("emailCliente", email);
      form.append("claveCliente", contrasenia);

      const DATA = await fetchData("cliente", "logIn", form);

      console.log(DATA);

      if (DATA.status) {
        setClave("");
        setEmail("");
        navigation.replace("Navigator");
      } else {
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  const navigateRegistrar = async () => {
    navigation.navigate("Registro")
  };

  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapeTopLeft} />
      <View style={styles.backgroundShapeBottomRight} />
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Email address</Text>
        <Input 
          style={styles.input} 
          placeholderTextColor="#aaa"
          value={email}
          setTextChange={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <Input 
          style={styles.input} 
          value={contrasenia}
          setTextChange={setClave}
          contra = {true}
        />
        <TouchableOpacity style={styles.button} >
          <Buttons textoBoton="Iniciar Sesión" accionBoton={handlerLogin}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('PasswordRecovery')}}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.registerText}>
            If you haven't registered yet, <Text style={styles.registerLink} onPress={navigateRegistrar}>Register Now</Text>
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
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginVertical: 10,
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
