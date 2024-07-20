import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import fetchData from '../utils/fetchdata';
import ProductsCard from '../components/Cards/ProductsCard';
import Header from '../components/Headers/Header';
import { IP } from '../utils/constantes';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const CARD_WIDTH = (width - 30) / COLUMN_COUNT;

export default function Productos({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        console.log(categoryId);
      try {
        const form = new FormData();
        form.append('id', categoryId);
        const data = await fetchData('prenda', 'readAllByCategorie', form);
        if (data.error) {
          setError(data.message);
        } else {
          setProducts(data.dataset); 
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const navigateToDetalleProducto = (productId) => {
    navigation.navigate('Preview', { productId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetalleProducto(item.id_prenda)}>
      <ProductsCard
        imageSource={{ uri: IP+"/images/productos/"+item.prenda_img}} 
        title={item.nombre_prenda} 
        price={item.precio} 
        stock={item.cantidad} 
        cardStyle={styles.card}
      />
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
        <Header title={categoryName}></Header>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_prenda.toString()}
        numColumns={COLUMN_COUNT} 
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    list: {
      padding: 10,
    },
    card: {
      width: CARD_WIDTH, 
      margin: 5,
    },
  });