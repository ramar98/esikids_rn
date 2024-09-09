import { ImageBackground, Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native';
import { Games } from '../components/games'
import { colores } from '../colores'

const GamesScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/background.png')} resizeMode='cover' style={styles.image}>
                <View style={{ alignSelf: 'center', width: '100%', height: '100%' }}>
                    <View style={styles.header}>
                        <Text style={styles.textheader}>¿A qué querés jugar?</Text>
                    </View>
                    <FlatList
                        data={Games}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(item.screen)}
                                style={styles.games}>
                                <Image style={styles.imageLogo} source={item.adress} />
                                <Text style={styles.text1}>{item.name}</Text>
                                <Text style={styles.text2}>{item.description}</Text>
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
        alignSelf: 'center',
        backgroundColor: colores.color7,
        borderRadius: 45
    },
    textheader: {
        margin: 10,
        fontSize: 40,
        textAlign: 'center',
        alignSelf: 'center',
        color: colores.color2,
        fontWeight: 'bold'
    },
    games: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        width: 250,
        backgroundColor: colores.color4,
        width: '95%',
        borderRadius: 20
    },
    imageLogo: {
        width: 150,
        height: 150,
        marginTop: 10
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 40,
        color: colores.color2
    },
    text2: {
        fontWeight: 'bold',
        fontSize: 12,
        color: colores.color2,
        marginBottom: 10
    }
})
export default GamesScreen;