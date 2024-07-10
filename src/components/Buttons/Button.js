
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#5a67d8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        textTransform: 'uppercase',
    }
});