import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { colores } from '../colores';
import { url } from '../url';
import { Course } from '../components/Course';
import { ButtonLogIn } from '../components/ButtonLogIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CoursesScreen = ({ navigation }) => {

    const [courses, setCourses] = useState([ ]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${url}api/coursesByUserId`, {
                headers: {
                    'x-access-token': token,
                }
            });
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            return token;
        } catch (error) {
            console.error('Error retrieving token:', error);
            return null;
        }
    };


    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <Text style={styles.text1}>Mis Cursos</Text>
            <View style={styles.rectangule1}>
                <Text style={styles.text2}>Elige un curso para acceder a más opciones</Text>
            </View>
            <View style={{ height: '50%', width: '90%', alignSelf: 'center' }}>
                <ScrollView persistentScrollbar={true}>
                    {courses.map((course, index) => (
                        <Course
                            key={index}
                            courseName={course.name}
                            schoolName={course.schoolName}
                            courseAge={course.courseAge}
                        />
                    ))}
                </ScrollView>
            </View>
            <ButtonLogIn text='Crear Curso' onPress={() => navigation.navigate('AddCourse')} marginBottom={10} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
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
        marginTop: 20,
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
        width: '70%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 40,
        paddingVertical: 5,
    },
});

export default CoursesScreen;