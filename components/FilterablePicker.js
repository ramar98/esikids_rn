import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { colores } from '../colores';

export function FilterablePicker(props) {
  const { placeholder, data, imageSource, onSelect } = props;

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Función para filtrar la lista de opciones
  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredData([]); // No mostrar resultados si el texto está en blanco
    } else {
      const filtered = data.filter((item) =>
        item.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };


  // Cuando se selecciona una opción
  const handleSelect = (item) => {
    props.onSelect(item);
    setQuery(item.label);
    setFilteredData([]); // Limpiar la lista de opciones al seleccionar
  };

  return (
    <View style={[styles.conteiner, filteredData.length > 0 && {borderRadius:20}]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>

        <Image style={{ width: 30, height: 30, resizeMode: 'contain', }} source={imageSource} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={(text) => handleSearch(text)}
        />

        <TouchableOpacity onPress={() => setFilteredData(filteredData.length > 0 ? [] : data)}>
          <Image style={{ width: 30, height: 30, resizeMode: 'contain', }} source={filteredData.length > 0 ? require('../assets/images/close_icon.png') : require('../assets/images/open_icon.png')} />
        </TouchableOpacity>
      </View>
      {/* Lista de opciones filtradas */}
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={styles.option}>{item.label}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 3,
    borderColor: colores.color1,
    borderRadius: 50,
    width: '85%',
    backgroundColor: colores.color2,
  },
  input: {
    marginLeft: -20,
    height: 42,
    width: '70%',
  },
  list: {
    marginTop: 5,
    maxHeight: 150,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
