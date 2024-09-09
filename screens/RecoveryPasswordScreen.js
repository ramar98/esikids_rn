import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'
import { ButtonLogIn } from '../components/ButtonLogIn'

const RecoveryPasswordScreen = ({ navigation }) => {

    const [username, setusername] = useState('')
    const [error, setError] = useState('')
    const [errorMsj, setErrorMsj] = useState('')

    const procesar = async () => {
        if (username === '') {
            setError('username');
            setErrorMsj('El usuario es requerido');
        }
        else {
            try {
                const response = await fetch(url + 'api/sendVerificationCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username
                    })
                });

                const result = await response.json();

                if (result.success === true) {
                    navigation.navigate('CodeVerification', { username: username });
                }
                else {
                    setError('username');
                    setErrorMsj('El usuario no existe');
                }

            } catch (error) {
                console.error(error);
                alert("Server error");
            }
        }

    }

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <View style={styles.rectangule1}>
                <Text style={styles.text1}>Vamos a enviar un codigo a tu correo para que puedas restablecer la contraseña. Por favor ingresá tu nombre de usuario.</Text>
            </View>
            <InputWithImage
                imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setusername}
            />
            {error === 'username' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorMsj}</Text> : null}
            <ButtonLogIn marginBottom={50} text='Enviar código' onPress={() => procesar()} />
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
        marginBottom: 30
    },
    text1: {
        color: colores.color4,
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '900',
    },
});

export default RecoveryPasswordScreen;