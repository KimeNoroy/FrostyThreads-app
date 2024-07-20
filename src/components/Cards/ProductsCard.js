import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductsCard = ({ imageSource, title, price, stock, cardStyle }) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <Text style={styles.stock}>In stock: {stock}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    margin: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    marginTop: 10,
    fontFamily: 'Raleway_700Bold',
    fontSize: 16, // Ajusta el tamaño de la fuente según tus necesidades
    color: 'black',
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  stock: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
});

export default ProductsCard;
