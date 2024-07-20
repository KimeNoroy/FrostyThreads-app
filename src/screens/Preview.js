import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal, TextInput, Button, Alert } from 'react-native';
import Header from '../components/Headers/Header';
import fetchData from '../utils/fetchdata';
import { IP } from '../utils/constantes';
import { Ionicons } from '@expo/vector-icons';

export default function Preview({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Cantidad inicial a añadir al carrito
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [idDetalleProducto, setIdDetalleProducto] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const form = new FormData();
        form.append('idPrenda', productId);
        const data = await fetchData('prenda', 'readOne', form);
        console.log(data);
        if (data.error) {
          setError(data.message);
        } else {
          setProduct(data.dataset); // Asegúrate de que el objeto de respuesta tenga una propiedad 'prenda'
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const formComments = new FormData();
        formComments.append('idPrenda', productId);
        const dataComments = await fetchData('prenda', 'getComments', formComments);
        if (dataComments.error) {
          setError(dataComments.message);
        } else {
          setComments(dataComments.dataset);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchComments();
  }, [productId]);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.starContainer}>
        {[...Array(filledStars)].map((_, index) => (
          <Ionicons key={index} name="star" size={20} color="#FFD700" />
        ))}
        {halfStar && <Ionicons name="star-half" size={20} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Ionicons key={index} name="star-outline" size={20} color="#FFD700" />
        ))}
      </View>
    );
  };

  const addToCart = async () => {
    const FORM = new FormData();
    FORM.append('idPrenda',productId);

    FORM.append('cantidadPrenda',quantity);
    FORM.append('fechaPrenda',new Date().toISOString().slice(0, 10));
    FORM.append('precioPrenda', product.precio);

     // Petición para añadir la prenda al carrito de compras.   
    const DATA = await fetchData('orden', 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
      navigation.navigate('Carrito');
    }

  };

  const checkPurchase = async () => {
    try {
      const form = new FormData();
      form.append('idPrenda', productId);
      const data = await fetchData('cliente', 'checkBuy', form);
      if (data.status !== 1) {
        Alert.alert('Debe comprar el producto para añadir un comentario.');
      } else {
        console.log(data.dataset[0].id_detalle_orden);
        setIdDetalleProducto(data.dataset[0].id_detalle_orden); // Extrae el id_detalle_orden del array
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const submitComment = async () => {
    try {
      const form = new FormData();
      form.append('detalleComentario', newComment);
      form.append('calificacionComentario', rating);
      form.append('estadoComentario', false);
      form.append('idDetalleOrdenComentario', idDetalleProducto);
      const data = await fetchData('comentario', 'createRow', form);
      console.log(data);
      if (data.error) {
        Alert.alert('Error', data.message);
      } else {
        Alert.alert('Comentario añadido correctamente');
        setModalVisible(false);
        setNewComment('');
        setRating(0);
        // Recargar comentarios
        const formComments = new FormData();
        formComments.append('idPrenda', productId);
        const dataComments = await fetchData('prenda', 'getComments', formComments);
        setComments(dataComments.dataset);
      }
    } catch (error) {
      Alert.alert('Error', 'Tienes que comprar el producto para dejar una reseña');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={"Preview"} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title={"Preview"} />
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={product ? product.nombre_prenda : 'Producto'} />
      {product && (
        <>
          <Image
            source={{ uri: IP + "/images/productos/" + product.prenda_img }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.description}>{product.detalle_prenda}</Text>
            <Text style={styles.price}>Price: {product.precio}</Text>
            <Text style={styles.stock}>In stock: {product.cantidad}</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity < product.cantidad ? quantity + 1 : quantity)}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addToCart}>
              <Text style={styles.addButtonLabel}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Reviews:</Text>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>{item.nombre_cliente + " " + item.apellido_cliente}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(item.calificacion_prenda)}
              </View>
              <Text style={styles.commentContent}>{item.detalle_comentario}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.addButton} onPress={checkPurchase}>
          <Text style={styles.addButtonLabel}>Add a comment</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Añadir comentario</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu comentario"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={30}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={submitComment}>
                <Text style={styles.modalButtonLabel}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonLabel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterButton: {
    fontSize: 24,
    padding: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  counter: {
    fontSize: 18,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#5a67d8',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
  },
  commentContent: {
    fontSize: 14,
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
  input: {
    width: '100%',
    height: 80, // Más grande para comentarios
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top', // Para que el texto se alinee en la parte superior
  },
  buttonContainer: {
    marginTop: 30,
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
