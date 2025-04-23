import { StyleSheet, View, Pressable, Text } from 'react-native';
import {theme} from '../theme'
import { ShoppingListItem } from "../components/ShoppingListItem"
import {Link} from 'expo-router'

export default function HomeScreen() {
  return(
    <View style={styles.container}>
        <Link 
            href="/counter"
            style={styles.linksStyle}
        >
            Go To /Counter
        </Link>
        <ShoppingListItem name="Coffee"/>
        <ShoppingListItem name="Snack"isCompleted/>
        <ShoppingListItem name="Book" isCompleted/>
    </View>
  )  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colorWhite,
    justifyContent:"center",
  },
  linksStyle:{
    textAlign:'center',
    marginBottom: 18,
    fontSize: 24,
  }
 });
