import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Perfil = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editField, setEditField] = useState(''); // Estado para almacenar qué campo se está editando
  const [userName, setUserName] = useState('Gabriel Cornejo'); // Nombre de usuario inicial
  const [userEmail, setUserEmail] = useState('gabriel@example.com'); // Correo electrónico inicial
  const [userPhone, setUserPhone] = useState('123456789'); // Número de teléfono inicial
  const [newName, setNewName] = useState(''); // Estado para almacenar el nuevo nombre

  const openEditModal = (field) => {
    setEditField(field);
    setModalVisible(true);
    if (field === 'name') {
      setNewName(userName); // Establecer el nuevo nombre como el nombre actual
    }
  };

  const handleSaveField = () => {
    switch (editField) {
      case 'name':
        setUserName(newName); // Guardar el nuevo nombre
        break;
      case 'email':
        setUserEmail(newName); // Guardar el nuevo correo electrónico
        break;
      case 'phone':
        setUserPhone(newName); // Guardar el nuevo número de teléfono
        break;
      default:
        break;
    }
    setModalVisible(false); // Cerrar el modal al guardar
  };

  const handleCancel = () => {
    setModalVisible(false); // Cerrar el modal al cancelar
  };

  const handleLogoutConfirmation = () => {
    // Mostrar una alerta de confirmación antes de cerrar sesión
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Aquí puedes realizar cualquier acción necesaria antes de cerrar sesión
            navigation.navigate('Sesion'); // Navega a la pantalla de inicio de sesión
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar la sesión del usuario
    // Por ejemplo, limpiar el almacenamiento local, navegar a la pantalla de inicio de sesión, etc.
    alert('Logout confirmed'); // Ejemplo de alerta, reemplazar con la lógica real
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Text style={styles.headerTitle}>User Information</Text>

      {/* Nombre de usuario */}
      <View style={[styles.userInfoContainer, styles.nameContainer]}>
        <Text style={styles.labelText}>Name</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{userName}</Text>
          <TouchableOpacity onPress={() => openEditModal('name')} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color="#000" />
            <Text style={styles.editButtonText}>Change Name</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Correo electrónico */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.labelText}>Email</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{userEmail}</Text>
          <TouchableOpacity onPress={() => openEditModal('email')} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color="#000" />
            <Text style={styles.editButtonText}>Change Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Número de teléfono */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.labelText}>Phone Number</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{userPhone}</Text>
          <TouchableOpacity onPress={() => openEditModal('phone')} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color="#000" />
            <Text style={styles.editButtonText}>Change Phone</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para cambiar el nombre, correo electrónico y número de teléfono */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editField === 'name' ? 'Change Name' : ''}
              {editField === 'email' ? 'Change Email' : ''}
              {editField === 'phone' ? 'Change Phone' : ''}
            </Text>
            {/* Input para cambiar el nombre */}
            {editField === 'name' && (
              <TextInput
                style={styles.inputField}
                placeholder="Enter new name"
                onChangeText={text => setNewName(text)}
                value={newName}
                autoFocus
              />
            )}
            {/* Input para cambiar el correo electrónico */}
            {editField === 'email' && (
              <TextInput
                style={styles.inputField}
                placeholder="Enter new email"
                onChangeText={text => setNewName(text)}
                value={newName}
              />
            )}
            {/* Input para cambiar el número de teléfono */}
            {editField === 'phone' && (
              <TextInput
                style={styles.inputField}
                placeholder="Enter new phone number"
                onChangeText={text => setNewName(text)}
                value={newName}
                keyboardType="numeric"
              />
            )}
            <TouchableOpacity
              onPress={handleSaveField}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity onPress={handleLogoutConfirmation} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  nameContainer: {
    marginBottom: 40, // Aumentamos el espacio para el nombre
  },
  labelText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20, // Aumentamos el padding vertical para los cuadros de información
    justifyContent: 'space-between',
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  editButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#E5EBFC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#004CFF', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Perfil;
