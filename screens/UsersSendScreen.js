import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text } from 'react-native'
import { colores } from '../colores'
import { url } from '../url'
import { ButtonLogIn } from '../components/ButtonLogIn'

const UsersSendScreen = ({ navigation, route }) => {

    const [error, setError] = useState('')
    const [errorMsj, setErrorMsj] = useState('')

    const params = route.params;

    const procesar = async () => {
        try {
            const response = await fetch(url + 'api/sendUserByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: params.email
                })
            });

            const result = await response.json();

            if (result.success !== true) {
                setError('email');
                setErrorMsj('Algo salio mal, intenta de nuevo mas tarde');
            }

        } catch (error) {
            console.error(error);
            alert("Server error");
        }

    }

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <View style={styles.rectangule1}>
                <Text style={styles.text1}>Te enviamos un correo electrónico con los usuarios asociados a tu mail. Por favor revisa tu bandeja de entrada.</Text>
            </View>
            <Image source={require('../assets/images/robot_icon.png')} style={styles.robot} />
            <ButtonLogIn marginBottom={50} text='Iniciar Sesión' onPress={() => navigation.navigate('Login')} />
            {error === 'email' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorMsj}</Text> : null}
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={styles.text2}>¿No recibiste el correo? </Text>
                <Text style={[styles.text2, { color: colores.color9, textDecorationLine: 'underline' }]} onPress={() => procesar()} >Reenviar.</Text>
            </View>
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
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    text1: {
        color: colores.color4,
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '900',
    },
    text2: {
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
});

export default UsersSendScreen;