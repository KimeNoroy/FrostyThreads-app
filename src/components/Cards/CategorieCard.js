import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CategorieCard = ({ imageSource, title, cardStyle }) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
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
    height: 100, // Ajusta la altura según tus necesidades
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    marginTop: 10,
    fontFamily: 'Raleway_700Bold',
    fontSize: 16, // Ajusta el tamaño de la fuente según tus necesidades
    color: 'black',
  },
});

export default CategorieCard;
