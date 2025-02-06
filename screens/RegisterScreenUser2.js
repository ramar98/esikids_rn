import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import { ButtonLogIn } from '../components/ButtonLogIn'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'
import CheckBox from '@react-native-community/checkbox';


const RegisterScreenUser2 = ({ route, navigation }) => {
    const params = route.params;
    const rol = params.rol;
    const email = params.email;
    const fecha = params.fecha;
    const studentEmail = params.studentEmail;
    const nombre = params.nombre;
    const apellido = params.apellido;

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [errorUsername, setErrorUsername] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorIsChecked, setErrorIsChecked] = useState('')

    const procesar = () => {
        let error = false;
        if (username === '') {
            setErrorUsername('El usuario es requerido')
            error = true;
        }
        if (password === '') {
            setErrorPassword('La contraseña es requerida')
            error = true;
        }
        else if (password.length < 8) {
            setErrorPassword('La contraseña debe tener al menos 8 caracteres');
            error = true;
        }
        if (confirmPassword === '') {
            setErrorConfirmPassword('La confirmación de la contraseña es requerida')
            error = true;
        }
        else if (password !== confirmPassword) {
            setErrorConfirmPassword('Las contraseñas no coinciden')
            error = true;
        }
        if (!isChecked) {
            setErrorIsChecked('Debes aceptar los términos y condiciones')
            error = true;
        }
        if (!error) {
            validar();
        }
    }

    const validar = async () => {
        const user = {
            username: username,
            password: password,
            email: email,
            studentEmail: studentEmail,
            rol: rol,
        }
        try {
            const response = await fetch(url + 'api/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const result = await response.json();

            if (result.success === true) {
                createUser(result.id);
            }
            else if (result.success === false) {
                if (result.key === 'username') {
                    setErrorUsername('El usuario ya existe')
                    return
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
    const createUser = async (user_id) => {
        const user = {
            user_id: user_id,
            name: nombre,
            lastname: apellido,
            birthdate: fecha.split('/').reverse().join('-'),
            avatar: 1
        }
        try {
            const response = await fetch(url + 'api/' + rol + 's', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },                body: JSON.stringify(user),

            });

            const result = await response.json();
            navigation.navigate('Avatar', { user_id: result.id, nombre: nombre, apellido: apellido, rol: rol });

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} resizeMode='cover' style={styles.image}>
            <Text style={styles.bienvenido}>Crea tu usuario</Text>
            <Text style={styles.texto1}>Ingresa tus datos para crear tu cuenta.</Text>
            <InputWithImage
                imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Usuario"
                value={username}
                onChangeText={(text) => { setUsername(text); setErrorUsername(''); }}
                marginTop={20}
            />
            {errorUsername !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorUsername}</Text> : null}
            <InputWithImage
                imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => { setPassword(text); setErrorPassword(''); }}
                isPassword={true}
                marginTop={20}
            />
            {errorPassword !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorPassword}</Text> : null}
            <InputWithImage
                imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={(text) => { setConfirmPassword(text); setErrorConfirmPassword(''); }}
                isPassword={true}
                marginTop={20}
            />
            {errorConfirmPassword !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorConfirmPassword}</Text> : null}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CheckBox
                    value={isChecked}
                    onValueChange={(newValue) => { setIsChecked(newValue); setErrorIsChecked(''); }}
                    title="Acepto los términos y condiciones"
                    style={{ marginTop: 30 }}
                />
                <Text style={styles.texto2}>Acepto los </Text>
                <Text style={styles.texto3}>términos y condiciones</Text>
            </View>
            {errorIsChecked !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorIsChecked}</Text> : null}
            <ButtonLogIn text='Registrate' onPress={() => procesar()} />
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={styles.texto5}>¿Ya tienes una cuenta? </Text>
                <Text style={[styles.texto5, { color: colores.color9, textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('Login')} >Ingresa aqui.</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    logoESIKids: {
        height: 175,
        width: 175,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    texto1: {
        marginBottom: 15,
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 12.5,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    texto2: {
        color: colores.color11,
        fontFamily: 'DM Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 30,
    },
    texto3: {
        color: colores.color11,
        textDecorationLine: 'underline',
        fontFamily: 'DM Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 30,
    },
    texto4: {
        color: colores.color11,
        fontFamily: 'DM Sans',
        fontSize: 11,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    texto5: {
        marginTop: 30,
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    bienvenido: {
        color: colores.color1,
        textAlign: 'center',
        fontSize: 35,
        fontStyle: 'normal',
        fontWeight: '700',
        marginTop: '20%',
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

export default RegisterScreenUser2;