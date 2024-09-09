import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text } from 'react-native'
import { colores } from '../colores'
import { ButtonLogIn } from '../components/ButtonLogIn'

const PasswordChangedScreen = ({navigation}) => {

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <View style={styles.rectangule1}>
                <Text style={styles.text1}>¡Tu contraseña fue cambiada con éxito!</Text>
                <Text style={styles.text2}>¡Tu contraseña fue cambiada con éxito!</Text>
            </View>
            <Image source={require('../assets/images/robot_icon.png')} style={styles.robot} />
            <ButtonLogIn marginBottom={50} text='Iniciar Sesión' onPress={() => navigation.navigate('Login')} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    logoESIKids: {
        height: 280,
        width: 280,
        alignSelf: 'center',
        marginTop: 60,
    },
    robot: {
        resizeMode: 'contain',
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: 10
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
        padding: 7,
    },
    text1: {
        color: colores.color2,
        textAlign: 'center',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: '900',
        textShadowColor: colores.color14,
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
    },
    text2: {
        color: colores.color9,
        textAlign: 'center',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: '900',
        textShadowColor: colores.color2,
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10,
        position:'absolute',
        top:7,
        left:28
    },
});

export default PasswordChangedScreen;