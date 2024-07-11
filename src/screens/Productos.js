import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Importa la imagen de Product 1
import Product1Image from '/xampp/htdocs/FrostyThreads-app/assets/product1.png/'; // Asegúrate de que la ruta sea correcta

const ProductosScreen = () => {
  const productos = [
    { id: '1', name: 'Product 1', description: 'Description of Product 1', price: '$50.00', image: Product1Image },
    { id: '2', name: 'Product 2', description: 'Description of Product 2', price: '$65.00', image: Product1Image },
    { id: '3', name: 'Product 3', description: 'Description of Product 3', price: '$40.00', image: Product1Image },
    { id: '4', name: 'Product 4', description: 'Description of Product 4', price: '$80.00', image: Product1Image },
    // Add more products as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>shop</Text>
      <Text style={styles.subTitle}>Products</Text>
      <FlatList
        data={productos}
        keyExtractor={item => item.id}
        numColumns={2} // Define el número de columnas aquí
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            {/* Mostrar la imagen si está presente */}
            {item.image && <Image source={item.image} style={styles.itemImage} />}
            <Text style={styles.itemText}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default ProductosScreen;
