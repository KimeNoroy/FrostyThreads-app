import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Carrito = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', size: 'M', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', size: 'L', price: 15, quantity: 2 },
    { id: 3, name: 'Product 3', size: 'S', price: 20, quantity: 1 },
  ]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Ionicons name="remove" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.trashButton}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <View style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={24} color="#ffffff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004CFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  cartBadge: {
    backgroundColor: '#000',
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 100,  // Aumentado el tamaño del cuadrado de imagen
    height: 100, // Aumentado el tamaño del cuadrado de imagen
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  itemSize: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  trashButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 5,
  },
  totalContainer: {
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#E5EBFC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Carrito;
