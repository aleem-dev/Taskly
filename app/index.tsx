import {useState} from 'react'
import { StyleSheet, TextInput, FlatList, Text, View } from 'react-native';
import {theme} from '../theme'
import { ShoppingListItem } from "../components/ShoppingListItem"
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
    <FlatList
      ListHeaderComponent={
        <TextInput
          placeholder='E.g Coffee'
          keyboardType='default'
          style={styles.textInput}
          onChangeText={(text)=>setValue(text)}
          onSubmitEditing={handleSubmit}
          returnKeyType='done'
          value={value}
        ></TextInput>
      }
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={shoppingList}
      renderItem={({item})=><ShoppingListItem name={item.name}/>}
      ListEmptyComponent={
        <View style={styles.emptyList}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    >
    </FlatList>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colorWhite,
    // justifyContent:"center", //it moves item on verticle axis
    paddingTop:12,
  },
  contentContainer:{
    paddingBottom: 24,
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
    backgroundColor:theme.colorWhite, //since we use stickyHeaderIndices={[0]} we need to provide background coloer as well
    //same applies to FlatList list header component
  },
  emptyList:{
    alignItems:'center',
    justifyContent:'center',
    marginVertical:18
  }
 });
