import {View, Text, StyleSheet} from 'react-native'
import {theme} from '../theme'

const IdeaScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Idea Screen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colorWhite,
    },
    text:{
        fontSize:24,
    },
})

export default IdeaScreen