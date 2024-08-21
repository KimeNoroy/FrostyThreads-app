import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import fetchData from "../utils/fetchdata";
import Buttons from '../components/Buttons/Button';
import InputPerfil from '../components/Inputs/InputsPerfil'; // Asegúrate que el import sea correcto aquí

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  const getPerfilData = async () => {
    try {
      const DATA = await fetchData("cliente", "readProfile");
      if (DATA.status) {
        const usuario = DATA.dataset;
        setNombre(usuario.nombre_cliente);
        setApellido(usuario.apellido_cliente);
        setCorreo(usuario.email_cliente);
      } else {
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al obtener los datos del perfil");
    }
  };

  const handlerEditarPerfil = async () => {
    try {
      const form = new FormData();
      form.append("nombreCliente", nombre);
      form.append("apellidoCliente", apellido);
      form.append("emailCliente", correo);

      const DATA = await fetchData("cliente", "editProfile", form);
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message);
      } else {
        Alert.alert("Error", DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al editar el perfil");
    }
  };

  const handleLogout = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut");
      if (DATA.status) {
        navigation.navigate('Sesion');
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const navigateCambioContra = async () => {
    navigation.navigate("PasswordRecovery");
  };

  useEffect(() => {
    getPerfilData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Información del Usuario</Text>
      <View style={styles.mainContainer}>
        <InputPerfil
          placeHolder="Nombre"
          setValor={nombre}
          setTextChange={setNombre} // Pasar la función que actualiza el estado
        />
        <InputPerfil
          placeHolder="Apellido"
          setValor={apellido}
          setTextChange={setApellido} // Pasar la función que actualiza el estado
        />
        <InputPerfil
          placeHolder="Correo"
          setValor={correo}
          setTextChange={setCorreo} // Pasar la función que actualiza el estado
        />
        <Buttons textoBoton='Editar Usuario' accionBoton={handlerEditarPerfil} />
        <Buttons textoBoton='Cambiar Contraseña' accionBoton={navigateCambioContra} />
        <Buttons textoBoton='Cerrar Sesión' accionBoton={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 70,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
