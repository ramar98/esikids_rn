import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'
import { ButtonLogIn } from '../components/ButtonLogIn'

const CodeVerificationScreen = ({ route, navigation }) => {
    const params  = route.params;

    const [error, setError] = useState('');
    const [errorMsj, setErrorMsj] = useState('')
    const [code, setCode] = useState('')

    const procesar = async () => {
        if (code === '') {
            setError('code');
            setErrorMsj('El código es requerido');
        }
        else {
            try {
                const response = await fetch(url + 'api/validateCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: params.username,
                        code: code
                    })
                });

                const result = await response.json();
                console.log(result);

                if (result.success === true) {
                    navigation.navigate('NewPassword', { username: params.username });
                }
                else {
                    setError('code');
                    setErrorMsj('El código es incorrecto');
                }

            } catch (error) {
                console.error(error);
                alert("Server error");
            }
        }

    }

    const reenviar = async () => {
        try {
            const response = await fetch(url + 'api/sendCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: params.username
                })
            });

            const result = await response.json();

            if (result.success !== true) {
                setError('codeSend');
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
                <Text style={styles.text1}>Ingresa aquí el codigo que te enviamos por correo.</Text>
            </View>
            <InputWithImage
                imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Codigo de verificación"
                value={code}
                onChangeText={setCode}
            />
            {error === 'code' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorMsj}</Text> : null}
            <ButtonLogIn marginBottom={10} text='Verificar código' onPress={() => procesar()} />
            {error === 'codeSend' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>{errorMsj}</Text> : null}
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop:30 }}>
                <Text style={styles.text2}>¿No recibiste el correo? </Text>
                <Text style={[styles.text2, { color: colores.color9, textDecorationLine: 'underline' }]} onPress={() => reenviar()} >Reenviar.</Text>
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
        fontSize: 20,
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

export default CodeVerificationScreen;