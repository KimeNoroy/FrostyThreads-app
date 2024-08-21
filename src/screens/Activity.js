import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import Header from '../components/Headers/Header';
import Input from '../components/Inputs/Input';
import fetchData from '../utils/fetchdata';

export default function Activity({navigation}) {
  const [addresses, setAddresses] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [detalle, setDetalle] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");

  const fetchAddresses = async () => {
    try {
      const data = await fetchData('domicilio', 'readAllByCustomer');
      if (data.status) {
        setAddresses(data.dataset);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () =>{
    try {
      const data = await fetchData('provincia', 'readAll');
      if (data.status) {
        setProvinces(data.dataset);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={"Addresses"} />
        <Text>Loading...</Text>
      </View>
    );
  }

  const handlePress = () => {
    fetchProvinces();
    setModalVisible(true);
  };

  const deleteAddress = async (id) =>{
    try {
      const formData = new FormData();
      formData.append('idDomicilio',id);
      const data = await fetchData('domicilio', 'deleteRow',formData);
      if (data.status) {
        fetchAddresses();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderAddress = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.quantity}>Province: {item.provincia}</Text>
        <Text style={styles.subtotal}>Address: {item.detalle_direccion}</Text>
      </View>
      <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAddress(item.id_domicilio)}
        >
          <Text style={styles.deleteButtonLabel}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleSubmit = async () =>{

    try {
      const formData = new FormData();
      formData.append('provinciaDomicilio',selectedProvince);
      formData.append('direccionDomicilio', detalle);
      const data = await fetchData('domicilio', 'createRow',formData);
      if (data.status) {
        setModalVisible(false);
        fetchAddresses();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <View style={styles.container}>
      <Header title={"Your Addresses"} />
      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id_domicilio.toString()}
        onRefresh={fetchAddresses} // Para refrescar cuando se hace scroll hacia arriba
        refreshing={loading}
        
      />
      <TouchableOpacity style={styles.finalizeButton} onPress={handlePress}>
          <Text style={styles.finalizeButtonLabel}>Add Address</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select an province</Text>
            <Picker
              selectedValue={selectedProvince}
              onValueChange={(itemValue) => setSelectedProvince(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select an option" value={null} />
              {provinces.map((item) => (
                <Picker.Item key={item.id_provincia} label={item.provincia} value={item.id_provincia} />
              ))}
            </Picker>
            <Input placeholder={"Your address"} value={detalle} setTextChange={setDetalle}></Input>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                <Text style={styles.modalButtonLabel}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonLabel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginTop: 10,
  },
  subtotal: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalizeButton: {
    backgroundColor: '#5a67d8',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },
  finalizeButtonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#5a67d8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  modalButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
