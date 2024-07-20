import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Definición del componente funcional Header
const Header = ({ title, searchBar = false }) => {
    // Renderizado del componente
    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {searchBar && (
                    <TextInput 
                        style={styles.searchBar} 
                        placeholder="Search..."
                    />
                )}
            </View>
        </View>
    );
};

// Definición de los estilos usando StyleSheet.create
const styles = StyleSheet.create({
    headerContainer: {
        fontFamily: "Raleway_700Bold",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white", // Color de fondo del encabezado 
        justifyContent: "space-between", // Espacio distribuido uniformemente entre los elementos hijos
        alignItems: "center", // Alinea los elementos al centro verticalmente
        marginTop: 0,
        paddingHorizontal: 20,
        width: 390,
        height: 100,
        paddingTop: 20,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row", // Los elementos se colocan en una fila
        backgroundColor: "white", // Color de fondo del contenedor del título
        justifyContent: "flex-start", // Espacio distribuido uniformemente entre los elementos hijos
        alignItems: "center", // Alinea los elementos al centro verticalmente
        marginTop: 0,
    },
    title: {
        fontFamily: "Raleway_700Bold", // Fuente en negrita
        fontWeight: "bold", // Peso de la fuente en negrita
        fontSize: 24, // Tamaño de la fuente
        color: "black", // Color del texto obtenido de Color.colorfont1
    },
    searchBar: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15, // Bordes redondeados
        backgroundColor: "#f0f0f0", // Color de fondo grisáceo
        width: 250, // Ancho ajustado
    },
});

// Exportar el componente Header como el componente predeterminado
export default Header;
