import { React, useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, FlatList, TouchableOpacity, Modal, Button,} from 'react-native'

const styleImageMemory = { width: 90, height: 90, margin: 10, alignSelf: 'center' }
const defaultBackground = require('../assets/images/fondoesikids.png');
import { stages } from '../components/memoryStages';
import { colores } from '../colores';

let numeroStage = 0;


function MemoryScreen({ route, navigation }) {
    const stage = route.params;
    numeroStage = stage;

    const ImagesMemory = [
        stages[numeroStage].image1,
        stages[numeroStage].image2,
        stages[numeroStage].image3,
        stages[numeroStage].image4,
        stages[numeroStage].image5,
        stages[numeroStage].image6,
        stages[numeroStage].image1,
        stages[numeroStage].image2,
        stages[numeroStage].image3,
        stages[numeroStage].image4,
        stages[numeroStage].image5,
        stages[numeroStage].image6,
    ]

    const crearDataBack = () => {
        let lista = []
        for (let i = 0; i < ImagesMemory.length; i++) {
            let item = {
                id: i,
                adress: defaultBackground
            }
            lista.unshift(item);
        }
        return lista;
    }

    const desordenarLista = (lista) => {

        return lista.sort(function (a, b) {

            return Math.random() - 0.5;
        });
    }

    const [iniciarVisible, setIniciarVisible] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [dataBack, setDataBack] = useState(crearDataBack())
    const [dataMemory, setDataMemory] = useState(desordenarLista(ImagesMemory))
    const [selected, setSelected] = useState(null);
    const [resolved, setResolved] = useState([])
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);


    const pressImage = (id) => {

        if (selected !== id) {

            if (!resolved.includes(id)) {
                const newData = dataBack.map(newItem => {
                    if (id == newItem.id) {
                        newItem.adress = dataMemory[id]
                    }
                    return newItem
                })
                setDataBack(newData)
                if (selected == null) {
                    setSelected(id)
                }
                else {
                    compararCartas(id);
                    setSelected(null)
                }
            }
        }

    }
    const finalizarGame = () =>{
        setModalVisible(false)
        navigation.navigate('MemoryStages')
    }

    const compararCartas = (id) => {
        if (dataMemory[selected] == dataMemory[id]) {
            resolved.unshift(selected)
            resolved.unshift(id)
            setResolved(resolved)
            if (dataMemory.length == resolved.length) stopTimer();
        }
        else {
            setTimeout(function () {
                const newDataBack = dataBack.map(newItem => {
                    let encontrado = false;
                    for (let i = 0; i < resolved.length; i++) {
                        if (newItem.id == resolved[i]) encontrado = true;
                    }
                    if (!encontrado) {
                        newItem.adress = defaultBackground
                    }
                    return newItem
                })
                setDataBack(newDataBack)
            }, 500);
        }
    }

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000); // Actualizar cada segundo
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const startTimer = () => {
        setIniciarVisible(false)
        setIsActive(true);
    };

    const stopTimer = () => {
        setModalVisible(true)
        setIsActive(false);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/fondogames.jpg')} resizeMode='cover' style={styles.image}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, margin: 10 }} >Felicitaciones!!!</Text>
                        <Button title='Continuar' onPress={() => finalizarGame()} />
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={iniciarVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalInicio}>
                        <Text style={{ fontSize: 25, margin: 10, color: colores.color2 }} >Presione para comenzar</Text>
                        <TouchableOpacity style={styles.btnIniciar} onPress={() => startTimer()}>
                            <Text style = {{fontSize:15, color: colores.color2, marginTop:8}}>Iniciar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.header}>
                    <Text style={styles.timer}>{formatTime(seconds)}</Text>
                </View>
                <View style={styles.puzle}>
                    <FlatList
                        data={dataBack}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => pressImage(item.id)}>
                                <Image style={styleImageMemory} source={item.adress} resizeMode='contain' />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    timer: {
        fontSize: 30,
        color: colores.color2,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 30,
        left: 30

    },
    modalInicio: {
        width: 300,
        height: 150,
        top: 350,
        borderRadius: 30,
        backgroundColor: colores.color7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnIniciar: {
        width: 70,
        height: 40,
        borderRadius: 15,
        backgroundColor: colores.color1,
        alignItems: 'center'
    },
    modalView: {
        width: 300,
        height: 150,
        top: 350,
        borderRadius: 30,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    header: {
        margin: 10,
        width: 380,
        height: 100,
        alignSelf: 'center',
        backgroundColor: colores.color1,
        borderRadius: 20
    },
    puzle: {
        marginTop: 50,
        alignItems: 'center',
        padding: 12,
        width: 380,
        height: 460,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: colores.color1
    }

});

export default MemoryScreen;