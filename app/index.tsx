import {useState} from 'react'
import { StyleSheet, TextInput, FlatList, Text, View } from 'react-native';
import {theme} from '../theme'
import { ShoppingListItem } from "../components/ShoppingListItem"
import {initialList} from "@/constants/tempData"
import { ShoppingListItemType } from '@/constants/projTypes';



export default function HomeScreen() {
  const [shoppingList,setShoppingList] = useState(initialList)
  const [value, setValue] = useState("")
  // user input a shopping list item
  const handleSubmit = () => {
    if (value){
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name:value,
          lastUpdatedTimestamp: Date.now()
        },
        ...shoppingList
      ]//here we using rest operator to mearge two arrays, we can use it in begining or end
      setShoppingList(newShoppingList);
      setValue("");
    }// setShoppingList([{id:new Date().toISOString() ,name:value}, ...shoppingList])
  }
  // user deletes shopping list item
  const handleDelete = (id:string):void => {
    console.log(`deleted item id: ${id}`)
    const newShoppingList = shoppingList.filter((item)=> item.id!=id)
    setShoppingList(newShoppingList);
  }
  // user complete shopping list item
  const handleToggleComplete = (id:string):void => {
    console.log(`compelted the item: ${id} at ${Date.now()}`)
    const newShoppingList = shoppingList.map((item)=>{
      if (item.id === id){
        return {...item,
          completedAtTimestamp: item.completedAtTimestamp
            ?undefined
            :Date.now(),
            lastUpdatedTimestamp: Date.now(),
        } //return an object
      } else {
        return item
      }
    })
    setShoppingList(newShoppingList)
  }

  //** Order by
  // display the incomplet item first
  // when a new item is added, it gets put at the top of the incompete pile
  // when it is marked as done, it goes to the top of the complete pile
  // when a previously completed item is marked incompleted, it goes back to the top of incompleted pile */
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
    data={orderShoppingList(shoppingList)}
    renderItem={({item})=>(
      <ShoppingListItem 
      name={item.name} 
      onDelete={()=>handleDelete(item.id)}
      onToggleComplete={()=>handleToggleComplete(item.id)}
      isCompleted={Boolean(item.completedAtTimestamp)}
      />
    )}
    ListEmptyComponent={
      <View style={styles.emptyList}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      >
    </FlatList>
  )
}
const orderShoppingList = (shoppingList:ShoppingListItemType[]) => {
  return shoppingList.sort((item1,item2)=>{
    
      if(item1.completedAtTimestamp && item2.completedAtTimestamp){
        return item2.completedAtTimestamp - item1.completedAtTimestamp
      }
      if(item1.completedAtTimestamp && !item2.completedAtTimestamp){
        return 1
      }
      if(!item1.completedAtTimestamp && item2.completedAtTimestamp){
        return -1
      }
      if(!item1.completedAtTimestamp && !item2.completedAtTimestamp){
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp
      }
      return 0
    }
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
