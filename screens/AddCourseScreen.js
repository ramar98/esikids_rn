import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { FilterablePicker } from '../components/FilterablePicker';
import { colores } from '../colores';
import { InputWithImage } from '../components/inputWithImage';
import { ButtonLogIn } from '../components/ButtonLogIn';
import { url } from '../url';

const AddCourseScreen = () => {

  const [school, setSchool] = useState({ label: '', value: '' });
  const [courseName, setCourseName] = useState('');
  const [ageRange, setAgeRange] = useState({ label: '', value: '' });
  const [schools, setSchools] = useState([]);

  const ageRanges = [
    { label: '0-2 años', value: '0-2' },
    { label: '3-5 años', value: '3-5' },
    { label: '6-8 años', value: '6-8' },
    { label: '9-12 años', value: '9-12' },
  ];


  const fetchSchools = async () => {
    try {
      const response = await fetch(url + 'api/schools'); // Reemplaza con la URL de tu API
      const schools = await response.json();
      setSchools(schools.map(school => ({ label: school.nombre, value: school.id })));
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
      <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
      <View style={styles.rectangule1}>
        <Text style={styles.text1}>Crear curso</Text>
      </View>
      <FilterablePicker
        data={schools}
        placeholder="Seleccione la institución"
        imageSource={require('../assets/images/school_icon.png')}
        onSelect={(value) => setSchool(value)}
      />
      <InputWithImage
        imageSource={require('../assets/images/course_icon.png')} // Reemplaza con la ruta de tu imagen
        placeholder="Ingresa aquí el nombre del curso"
        value={courseName}
        marginTop={20}
        onChangeText={(text) => {
          setCourseName(text);
          setError('');
        }}
      />
      <FilterablePicker
        data={ageRanges}
        placeholder="Seleccione el rango de edad"
        imageSource={require('../assets/images/fech_icon.png')}
        onSelect={(value) => setAgeRange(value)}
      />

      <ButtonLogIn marginTop={40} text='Confirmar' onPress={() => procesar()} />

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  logoESIKids: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  text1: {
    color: colores.color4,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  text2: {
    color: colores.color11,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rectangule1: {
    shadowColor: colores.color11,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colores.color3,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },

});

export default AddCourseScreen;