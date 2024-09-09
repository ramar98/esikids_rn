import { ImageBackground, Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native';
import { stages } from '../components/memoryStages';
import { colores } from '../colores';

const MemoryStagesScreen = ({ navigation }) => {

    const EnviarStage = (stage) => {

        navigation.navigate('Memory', stage)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/background.png')} resizeMode='cover' style={styles.image}>
                <View style={{ alignSelf: 'center', width: '100%', height: '98%' }}>
                    <View style={styles.header}>
                        <Text style={styles.textheader}>Elige un escenario</Text>
                    </View>
                    <FlatList
                        data={stages}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => EnviarStage(item.id)}
                                style={styles.stages}>
                                <Image style={styles.imageLogo} source={item.adress} />
                                <Text style={styles.text1}>{item.name}</Text>
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
    header: {
        marginTop: 25,
        marginBottom: 10,
        width: '95%',
        height: 60,
        alignSelf: 'center',
        backgroundColor: colores.color8,
        borderRadius: 40,
        borderColor: colores.color3,
        borderWidth: 3
    },
    textheader: {
        fontSize: 40,
        textAlign: 'center',
        alignSelf: 'center',
        color: colores.color2,
        fontWeight: 'bold'
    },
    imageLogo: {
        width: 250,
        height: 250,
        marginTop: 10
    },
    stages: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        width: 250,
        backgroundColor: colores.color4,
        width: '95%',
        height: 300,
        borderRadius: 20,
        borderColor: colores.color3,
        borderWidth: 3
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 30,
        color: colores.color2,
        marginBottom: 10
    },
})
export default MemoryStagesScreen;