import { Image, StyleSheet, Platform, Text, View, TouchableOpacity, Alert } from 'react-native';
import {theme} from '../../theme'
import { ShoppingListItem } from "../../components/ShoppingListItem"

export default function HomeScreen() {
  return(
    <View style={styles.container}>
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
 });
