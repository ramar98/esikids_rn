import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { ButtonLogIn } from '../components/ButtonLogIn'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'

const LoginScreen = ({ navigation }) => {
    const [pass, setPass] = useState('Holala10')
    const [username, setusername] = useState('ramiro')
    const [error, setError] = useState('')
    const [errorMsj, setErrorMsj] = useState('')

    const procesar = () => {
        if (username === '') {
            setError('username');
            setErrorMsj('El usuario o email es requerido');
        }
        else if (pass === '') {
            setError('password');
            setErrorMsj('La contraseña es requerida');
        }
        else {
            validar();
        }
    }

    const validar = async () => {
        try {
            const response = await fetch(url + 'api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: pass
                })
            });

            const result = await response.json();

            if (result.success === true) {
                navigation.navigate('Home', { token: result.token, studentData: result.studentData });
            }
            else {
                setError('credentials');
                setErrorMsj('Usuario o contraseña incorrectos');
            }

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    }

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <ScrollView style={{ flex: 1 }}>
                <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
                <View style={styles.rectangule1}>
                    <Text style={styles.bienvenido}>¡Bienvenido!</Text>
                </View>
                <InputWithImage
                    imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setusername}
                />
                {error === 'username' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <Text onPress={() => navigation.navigate('RecoveryUser')} style={styles.texto2}>¿Olvidaste tu usuario?</Text>
                <InputWithImage
                    imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Contraseña"
                    value={pass}
                    onChangeText={setPass}
                    isPassword={true}
                />
                {error === 'password' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <Text onPress={() => navigation.navigate('RecoveryPassword')} style={styles.texto2}>¿Olvidaste tu contraseña?</Text>
                <ButtonLogIn style={{ marginTop: 40 }} text='Iniciar Sesión' onPress={() => procesar()} />
                {error === 'credentials' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={styles.texto1}>¿Aun no tiene una cuenta? </Text>
                    <Text style={styles.texto3} onPress={() => navigation.navigate('ChoiseUser')} >Únete aqui.</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    logoESIKids: {
        height: 250,
        width: 250,
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
        width: '70%',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 80
    },
    texto1: {
        marginTop: 30,
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    texto2: {
        color: colores.color11,
        textDecorationLine: 'underline',
        textAlign: 'right',
        fontFamily: 'DM Sans',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 'bold',
        width: 180,
        alignSelf: 'flex-end',
        marginTop: -8,
        marginRight: 50,
        marginBottom: 25
    },
    texto3: {
        marginTop: 30,
        color: colores.color9,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    bienvenido: {
        color: colores.color4,
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '900',
    },
    inputLogin: {
        flexDirection: 'row'
    },
    loginIcon: {
        marginLeft: 10,
        alignSelf: 'center',
        width: 25,
        height: 25
    }
});

export default LoginScreen;