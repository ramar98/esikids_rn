import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { colores } from '../colores'
import {ButtonStart} from '../components/ButtonStart'

const RegisteredUserScreen = ({ route, navigation }) => {
    const params = route.params;
    const name = params.nomApe.split(' ')[0].toUpperCase();
    const lastName = params.nomApe.split(' ')[1].toUpperCase();

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <Text style={styles.text1}>¡Usuario Registrado!</Text>
            <View style={styles.rectangule1}>
                <Text style={styles.text2}>Ya podes acceder a todo nuestro contenido</Text>
            </View>
            {params.rol === 'student' ? (
                <Image source={require('../assets/images/student_icon.png')} style={styles.imageRole} />
            ) : (
                <Image source={require('../assets/images/teacher_icon.png')} style={styles.imageRole} />
            )}
            <View style={[styles.rectangule2, { backgroundColor: params.rol === 'student' ? colores.color13 : colores.color4 }]}>
                <Text style={[styles.text3, { color: params.rol === 'student' ? colores.color4 : colores.color2, }]}>{name}</Text>
                <Text style={[styles.text3, { color: params.rol === 'student' ? colores.color4 : colores.color2, }]}>{lastName}</Text>
            </View>
            <ButtonStart text='Comencemos' rol={params.rol} onPress = {() => navigation.navigate('Login')}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    logoESIKids: {
        height: 160,
        width: 160,
        alignSelf: 'center',
        marginTop: 50
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
        width: '75%',
        alignSelf: 'center',
        marginTop: 10,
    },
    rectangule2: {
        borderRadius: 10,
        width: '55%',
        alignSelf: 'center',
        marginTop: 30,
        justifyContent: 'center',
    },
    text1: {
        color: colores.color4,
        fontSize: 38,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '900'
    },
    text2: {
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 'bold',
        padding: 2
    },
    text3: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '900',
        padding: 2
    },
    imageRole: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: 20
    }
});

export default RegisteredUserScreen;