import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'
import { ButtonLogIn } from '../components/ButtonLogIn'

const NewPasswordScreen = ({ route, navigation }) => {
    const params  = route.params;

    const [error, setError] = useState('');
    const [errorMsj, setErrorMsj] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const procesar = async () => {
        if (password === '') {
            setError('password')
            setErrorMsj('La contraseña es requerida')
            return
        }
        if (password.length < 8) {
            setError('password')
            setErrorMsj('La contraseña debe tener al menos 8 caracteres')
            return
        }
        if (confirmPassword === '') {
            setError('confirmPassword')
            setErrorMsj('La confirmación de la contraseña es requerida')
            return
        }
        if (password !== confirmPassword) {
            setError('confirmPassword')
            setErrorMsj('Las contraseñas no coinciden')
            return
        }
        setError('')
        const data = {
            username: params.username,
            password: password
        }
        try {
            const response = await fetch(url + 'api/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();

            if (result.success === true) {
                navigation.navigate('PasswordChanged');
            }
            else {
                setError('password')
                setErrorMsj('Error al cambiar la contraseña')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <View style={styles.rectangule1}>
                <Text style={styles.text1}>Por favor, ingresa una nueva contraseña.</Text>
                <Text style={[styles.text1,{fontSize:15, fontWeight:400}]}>Recuerda que debe contener al menos 8 caracteres.</Text>
            </View>
            <InputWithImage
                imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Nueva contraseña"
                value={password}
                onChangeText={setPassword}
                isPassword={true}
            />
            {error === 'password' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorMsj}</Text> : null}
            <InputWithImage
                imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Repite la nueva contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword={true}
            />
            {error === 'confirmPassword' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorMsj}</Text> : null}
            <ButtonLogIn marginBottom={50} text='Confirmar' onPress={() => procesar()} />
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
        marginBottom: 25,
        padding: 7,
    },
    text1: {
        color: colores.color4,
        textAlign: 'center',
        fontSize: 19,
        fontStyle: 'normal',
        fontWeight: '900',
    },
});

export default NewPasswordScreen;