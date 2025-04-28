import {useState} from 'react'
import { StyleSheet, View, Pressable, Text,TextInput } from 'react-native';
import {theme} from '../theme'
import { ShoppingListItem } from "../components/ShoppingListItem"
import {Link} from 'expo-router'
import {initialList} from "@/constants/tempData"

export default function HomeScreen() {
  const [shoppingList,setShoppingList] = useState(initialList)
  const [value, setValue] = useState("")
  const handleSubmit = () => {
    if (value){
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name:value
        },
        ...shoppingList
      ]
      setShoppingList(newShoppingList);
      setValue("");
    }// setShoppingList([{id:new Date().toISOString() ,name:value}, ...shoppingList])
  }
  return(
    <View style={styles.container}>
      <TextInput
        placeholder='Input Text'
        keyboardType='default'
        style={styles.textInput}
        onChangeText={(text)=>setValue(text)}
        onSubmitEditing={handleSubmit}
        returnKeyType='done'
        value={value}
      ></TextInput>
      {shoppingList.map((item)=>(
          <ShoppingListItem name={item.name} key={item.id}/>
        ))
      }
    </View>
  )  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colorWhite,
    // justifyContent:"center", //it moves item on verticle axis
  },
  linksStyle:{
    textAlign:'center',
    marginBottom: 18,
    fontSize: 24,
  },
  textInput:{
    borderColor:theme.colorLightGrey,
    borderWidth:2,
    borderRadius:50,
    fontSize:18,
    padding:12,
    margin:12,
  }
 });
