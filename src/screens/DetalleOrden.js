import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import fetchData from '../utils/fetchdata';
import { IP } from '../utils/constantes';
import Header from '../components/Headers/Header';

export default function DetalleOrden({navigation,route}) {
  const {idOrden} = route.params;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const title = "Order: "+idOrden;

  const fetchDetail = async () => {
    try {
      const formData = new FormData();
      formData.append('idOrden',idOrden);
      const data = await fetchData('detalle_orden', 'readAllByOrder',formData);
      if (data.status) {
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
    fetchDetail();
  }, []);

  const calculateTotal = (orders) => {
    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += parseFloat(order.precio_prenda * order.cantidad_prenda);
    });
    setTotal(totalAmount);
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={title} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title={title} />
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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={title} />
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id_detalle_orden.toString()}
        onRefresh={fetchDetail} // Para refrescar cuando se hace scroll hacia arriba
        refreshing={loading}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{total === -1 ? "No products in the order" : "Total: $" + total}</Text>
      </View>
      {total !== -1 && (
        <TouchableOpacity style={styles.finalizeButton} onPress={() => {navigation.goBack()}}>
          <Text style={styles.finalizeButtonLabel}>Return</Text>
        </TouchableOpacity>
      )}
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
