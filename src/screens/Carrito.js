import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import fetchData from '../utils/fetchdata';
import { IP } from '../utils/constantes';
import Header from '../components/Headers/Header';

export default function ShoppingCart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchOrders = async () => {
    try {
      const data = await fetchData('orden', 'readActiveOrders');
      if (data.error) {
        setError(data.message);
        setOrders(null);
        setTotal(-1);
      } else {
        setOrders(data.dataset);
        calculateTotal(data.dataset);
      }
    } catch (error) {
      setError(error.message);
      setOrders(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateTotal = (orders) => {
    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += parseFloat(order.precio_prenda * order.cantidad_prenda);
    });
    setTotal(totalAmount);
  };

  const fetchAddresses = async () => {
    try {
      const data = await fetchData('domicilio', 'readAllByCustomer');
      if (data.error) {
        setError(data.message);
      } else {
        setAddresses(data.dataset);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const finishOrder = async (direccion) => {
    try {
      const form = new FormData();
      form.append('idDireccion', direccion);
      const data = await fetchData('orden', 'finishOrder', form);
      console.log(data);
      if (data.error) {
        setError(data.message);
      } else {
        Alert.alert('Orden finalizada con éxito.');
        fetchOrders(); // Refrescar la lista de órdenes después de finalizar
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const finalizeOrder = () => {
    setModalVisible(true);
    fetchAddresses();
  };

  const handleSubmit = async () => {
    try {
      if (!selectedAddress) {
        Alert.alert('Error', 'Debe seleccionar una dirección.');
        return;
      }
      await finishOrder(selectedAddress);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const deleteProduct = async (idDetalleOrden) => {
    try {
      const form = new FormData();
      form.append('idDetalleOrden', idDetalleOrden);
      const data = await fetchData('detalle_orden', 'deleteRow', form);
      if (data.error) {
        setError(data.message);
      } else {
        Alert.alert('Producto eliminado con éxito.');
        fetchOrders(); // Refrescar la lista de órdenes después de eliminar
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={"Carrito de Compras"} />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title={"Carrito de Compras"} />
        <Text>{error}</Text>
      </View>
    );
  }

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: IP + "/images/productos/" + item.prenda_img }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.nombre_prenda}</Text>
        <Text style={styles.quantity}>Quantity: {item.cantidad_prenda}</Text>
        <Text style={styles.subtotal}>Subtotal: ${item.cantidad_prenda * item.precio_prenda}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteProduct(item.id_detalle_orden)}
        >
          <Text style={styles.deleteButtonLabel}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={"Shopping cart"} />
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id_detalle_orden.toString()}
        onRefresh={fetchOrders} // Para refrescar cuando se hace scroll hacia arriba
        refreshing={loading}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{total === -1 ? "No products in the shopping cart" : "Total: $" + total}</Text>
      </View>
      {total !== -1 && (
        <TouchableOpacity style={styles.finalizeButton} onPress={finalizeOrder}>
          <Text style={styles.finalizeButtonLabel}>Finish Order</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select an address</Text>
            <Picker
              selectedValue={selectedAddress}
              onValueChange={(itemValue) => setSelectedAddress(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select an option" value={null} />
              {addresses.map((address) => (
                <Picker.Item key={address.id_domicilio} label={address.detalle_direccion} value={address.detalle_direccion} />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                <Text style={styles.modalButtonLabel}>Sent</Text>
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
