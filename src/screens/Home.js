import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import Header from '../components/Headers/Header';
import CategorieCard from '../components/Cards/CategorieCard';
import fetchData from '../utils/fetchdata';
import { IP } from '../utils/constantes';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default function Home({navigation}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user,setUser] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchData('categoria', 'readAll');
        console.log(data);
        if (data.error) {
          setError(data.message);
        } else {
          setCategories(data.dataset); // Asegúrate de que el objeto de respuesta tenga una propiedad 'categories'
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const setNewUser = ({email}) =>{
      return email.split('@')[0];
    };
    const getUser = async () =>{
      try {
        const data = await fetchData('cliente', 'getName');
        console.log(data);
        if (data.error) {
          setError(data.message);
        } else {
          let email = String(data.dataset.nombre);
          setUser(setNewUser({email})); // Asegúrate de que el objeto de respuesta tenga una propiedad 'categories'
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    getUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={"Frosty Threads"} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title={"Frosty Threads"}/>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Productos', { categoryId: item.id_categoria, categoryName: item.categoria })}>
      <CategorieCard
      imageSource={{ uri: IP+"/images/categorias/"+item.categoria_img }} 
      title={item.categoria} 
      cardStyle={{ width: CARD_WIDTH }}
    />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Header title={"Shop"} />
      <Text style={styles.totalText}>Hello, {user}</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_categoria.toString()} 
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});