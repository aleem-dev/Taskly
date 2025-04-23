import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {theme} from '../theme'
import {useRouter}  from 'expo-router'

export default function CounterScreen() {
    const router = useRouter()
    return(
        <View style={Styles.container}>
            <Text style={Styles.text}>Counter Screen</Text>
            <TouchableOpacity
            onPress={
                ()=> router.navigate("/idea")
            }
            >
                <Text style={Styles.linksStyle}>
                    Go To /idea
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colorWhite,
    },
    text:{
        fontSize: 24,
    },
    linksStyle:{
        textAlign:'center',
        marginBottom: 18,
        fontSize: 24,
    }
})