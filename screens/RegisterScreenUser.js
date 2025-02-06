import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import { ButtonLogIn } from '../components/ButtonLogIn'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'
import DateTimePicker from '@react-native-community/datetimepicker';


const RegisterScreenUser = ({ route, navigation }) => {
    const params = route.params;
    const rol = params.rol;

    const [studentEmail, setStudentEmail] = useState('')
    const [email, setEmail] = useState('')
    const [dni, setDni] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [fec, setFec] = useState(new Date());
    const [fecha, setFecha] = useState('')
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [errorNombre, setErrorNombre] = useState('')
    const [errorApellido, setErrorApellido] = useState('')
    const [errorDni, setErrorDni] = useState('')
    const [errorFecha, setErrorFecha] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorStudentEmail, setErrorStudentEmail] = useState('')

    const onChange = (event, selectedDate) => {
        setErrorFecha('');
        const currentDate = selectedDate;
        setShow(false);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        setFecha(currentDate.toLocaleDateString('en-GB', options));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const validarMail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const procesar = () => {
        let error = false;
        if (nombre === '') {
            setErrorNombre('El nombre es requerido')
            error = true;
        }
        if (apellido === '') {
            setErrorApellido('El apellido es requerido')
            error = true;
        }
        if (rol === 'teacher' && dni === '') {
            setErrorDni('El DNI es requerido')
            error = true;
        }
        else if (rol === 'teacher' && dni.length !== 8) {
            setErrorDni('El DNI debe tener 8 dígitos')
            error = true;
        }
        if (fecha === '') {
            setErrorFecha('La fecha de nacimiento es requerida')
            error = true;
        }
        if (email === '') {
            setErrorEmail('El email es requerido')
            error = true;
        }
        else if (!validarMail(email)) {
            setErrorEmail('Correo no válido. Formato: example@dominio.com')
            error = true;
        }

        if (rol === 'student' && studentEmail !== '') {
            if (studentEmail === email) {
                setErrorStudentEmail('El correo del alumno no puede ser igual al correo del tutor');
                error = true;
            } else if (!validarMail(studentEmail)) {
                setErrorStudentEmail('Correo no válido. Formato: example@dominio.com')
                error = true;
            }
        }
        if (!error) {
            validateEmail();
        }
    }

    const validateEmail = async () => {
        try {
            let result = false;
            if (studentEmail !== '') {
                const response = await fetch(url + 'api/users/validateEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: studentEmail }),
                });

                result = await response.json();
            }
            if (result === false && studentEmail !== '') {
                setErrorStudentEmail('El correo ya se encuentra en uso')
            }
            else {

                response = await fetch(url + 'api/users/validateEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                result = await response.json();
                if (result === false) {
                    setErrorEmail('El correo ya se encuentra en uso')
                }
                else {
                    navigation.navigate('RegisterUser2', {
                        rol: rol,
                        email: email,
                        fecha: fecha,
                        studentEmail: studentEmail,
                        nombre: nombre,
                        apellido: apellido,
                        dni: dni
                    });
                }
            }

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    }

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} resizeMode='cover' style={styles.image}>
            <Text style={styles.bienvenido}>Crea tu usuario</Text>
            <Text style={styles.texto1}>Ingresa tus datos para crear tu cuenta.</Text>
            <InputWithImage
                imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Nombre"
                value={nombre}
                onChangeText={(text) => { setNombre(text); setErrorNombre(''); }}
                marginTop={20}
            />
            {errorNombre !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorNombre}</Text> : null}
            <InputWithImage
                imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder="Apellido"
                value={apellido}
                onChangeText={(text) => { setApellido(text); setErrorApellido(''); }}
                marginTop={20}
            />
            {errorApellido !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorApellido}</Text> : null}
            {rol === 'teacher' && (
                <>
                    <InputWithImage
                        imageSource={require('../assets/images/dni_icon.png')} // Reemplaza con la ruta de tu imagen
                        placeholder="DNI sin puntos"
                        value={dni}
                        onChangeText={(text) => { setDni(text); setErrorDni(''); }}
                        marginTop={20}
                        keyboardType='numeric'
                    />
                    {errorDni !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorDni}</Text> : null}
                </>
            )}
            <TouchableOpacity onPress={() => showDatepicker()}>
                <InputWithImage
                    imageSource={require('../assets/images/fec_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Fecha de nacimiento"
                    value={fecha}
                    editable={false}
                    marginTop={20}
                    onChangeText={() => { setErrorFecha(''); }}
                />
            </TouchableOpacity>
            {errorFecha !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorFecha}</Text> : null}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={fec}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - (rol === 'student' ? 3 : 18)))}
                    minimumDate={new Date(new Date().setFullYear(new Date().getFullYear() - (rol === 'student' ? 12 : 65)))}
                />
            )}
            {rol === 'student' && (
                <>
                    <InputWithImage
                        imageSource={require('../assets/images/email_icon.png')} // Reemplaza con la ruta de tu imagen
                        placeholder="Correo del alumno (opcional)"
                        value={studentEmail}
                        onChangeText={(text) => { setStudentEmail(text); setErrorStudentEmail(''); }}
                        marginTop={20}
                    />
                    {errorStudentEmail !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorStudentEmail}</Text> : null}
                </>
            )}
            <InputWithImage
                imageSource={require('../assets/images/email_icon.png')} // Reemplaza con la ruta de tu imagen
                placeholder={rol === 'student' ? "Correo del tutor" : "Correo electrónico"}
                value={email}
                onChangeText={(text) => { setEmail(text); setErrorEmail(''); }}
                marginTop={20}
            />
            {errorEmail !== '' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorEmail}</Text> : null}

            <ButtonLogIn text='Siguiente' onPress={() => procesar()} marginTop={40} />
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
    },
    texto3: {
        color: colores.color11,
        textDecorationLine: 'underline',
        fontFamily: 'DM Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
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

export default RegisterScreenUser;