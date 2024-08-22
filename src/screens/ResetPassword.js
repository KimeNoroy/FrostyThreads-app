import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

export default function ResetPassword({ navigation }) {
  const [oldPassword, setOldPassword] = useState(""); // Estado para la contraseña anterior
  const [newPassword, setNewPassword] = useState(""); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la nueva contraseña

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas nuevas no coinciden. Por favor, inténtelo nuevamente.");
      return;
    }

    try {
      // Primero, verifica la contraseña antigua
      const verifyFormData = new FormData();
      verifyFormData.append('claveActual', oldPassword);
      const verifyResult = await fetchData('cliente', 'verifyOldPassword', verifyFormData);

      if (!verifyResult.status) {
        Alert.alert("Error", "La contraseña anterior es incorrecta. Por favor, inténtelo nuevamente.");
        return;
      }

      // Luego, cambia la contraseña
      const changeFormData = new FormData();
      changeFormData.append('claveNueva', newPassword);
      const changeResult = await fetchData('cliente', 'changePassword', changeFormData);

      if (changeResult.status) {
        Alert.alert("Éxito", "Tu contraseña ha sido cambiada exitosamente.");
        navigation.navigate("Sesion");
      } else {
        Alert.alert("Error", "Ocurrió un error al cambiar la contraseña. Por favor, inténtelo nuevamente.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al procesar la solicitud.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapeTopLeft} />
      <View style={styles.backgroundShapeBottomRight} />
      <Text style={styles.title}>Change your password</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Old Password</Text>
        <Input
          value={oldPassword}
          setTextChange={setOldPassword}
          placeholder="Enter your old password"
          secureTextEntry={true}
        />
        <Text style={styles.label}>New Password</Text>
        <Input
          value={newPassword}
          setTextChange={setNewPassword}
          placeholder="Enter new password"
          secureTextEntry={true}
        />
        <Text style={styles.label}>Confirm New Password</Text>
        <Input
          value={confirmPassword}
          setTextChange={setConfirmPassword}
          placeholder="Confirm new password"
          secureTextEntry={true}
        />
        <Buttons
          textoBoton="Change Password"
          accionBoton={handleChangePassword}
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
    marginBottom: 5,
  },
  backLink: {
    color: '#0066ff',
    marginTop: 20,
  },
});
