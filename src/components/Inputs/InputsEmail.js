

import { StyleSheet, TextInput} from 'react-native';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#828181'}
    onChangeText={setTextChange}
    keyboardType="email-address"
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#00000000',
    color: '#000',
    fontSize: 16,
  }

});
