import { ImageBackground, Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native';
import { colores } from '../colores';

const ProgressScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/background.png')} resizeMode='cover' style={styles.image}>
                <View style = {{alignSelf:'center'}}>
                    <Text style={{fontSize:40, color:colores.color1, marginTop:300, fontWeight:'bold'}}>PROXIMAMENTE</Text>
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
    imageLogo: {
        width: 50,
        height: 50
    }
})
export default ProgressScreen;