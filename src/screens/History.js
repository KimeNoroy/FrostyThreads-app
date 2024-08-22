import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import fetchData from '../utils/fetchdata';
import Header from '../components/Headers/Header';

export default function History({navigation}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await fetchData('orden', 'readAllByCostumer');
      console.log(data);
      if (data.status) {
        setOrders(data.dataset);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={"Orders"} />
        <Text>Loading...</Text>
      </View>
    );
  }

  const handlePress = (id) => {
    navigation.navigate('DetalleOrden', { idOrden: id }); // Navega a DetalleOrden pasando el id
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id_orden)}>
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.quantity}>ID: {item.id_orden}</Text>
        <Text style={styles.subtotal}>Total: ${item.total}</Text>
        <Text style={styles.subtotal}>Address: {item.direccion_orden}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={"Orders"} />
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id_orden.toString()}
        onRefresh={fetchOrders} // Para refrescar cuando se hace scroll hacia arriba
        refreshing={loading}
        
      />
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