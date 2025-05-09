import {useState, useEffect} from 'react'
import { StyleSheet, TextInput, FlatList, Text, View, LayoutAnimation } from 'react-native';
import {theme} from '../theme'
import { ShoppingListItem } from "@/components"
import {initialList} from "@/constants/tempData"
import { ShoppingListItemType } from '@/constants/projTypes';
import {getFromStorage, saveToStorage} from '@/utils/storage';
import * as Haptics from 'expo-haptics'
import { useContext } from 'react';
import { ShoppingListContext } from './context/ShoppingListContext';
import * as Notifications from "expo-notifications"
import { Platform } from 'react-native';

export const storageKey = "shopping-list"


export default function HomeScreen() {
  const { shoppingList, updateShoppingList } = useContext(ShoppingListContext);
  // const [shoppingList,setShoppingList] = useState(initialList)
  const [value, setValue] = useState("")


  
  //load data
  useEffect(()=>{
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if(data){
        setShoppingList(data)
      }
    };
    fetchInitial();
  }, []);

  // user input a shopping list item
  const handleSubmit = () => {
  if (!value.trim()) return; // Prevent empty submissions

  const newItem: ShoppingListItemType = {
    id: new Date().toISOString(),
    name: value.trim(), // Ensure no extra spaces
    createdAtTimestamp: Date.now(),
    lastUpdatedTimestamp: Date.now(),
    eventType: "created",
  };

  // Update shopping list through context
  const updatedList = [newItem, ...shoppingList];

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  updateShoppingList(updatedList); //  Use context to update globally

  setValue(""); // Clear input field
};


  // user deletes shopping list item
  // const handleDelete = async (id:string):void => {
  //   console.log(`deleted item id: ${id}`)
  //   const deletedItem = shoppingList.find((item) => item.id === id);
  //   const newShoppingList = shoppingList.filter((item)=> item.id!=id)
  //   if(deletedItem){
  //     deletedItem.deletedAtTimestamp = Date.now();
  //     deletedItem.eventType = "deleted";
  //     const historyData = await getFromStorage("history") ?? [];
  //     await saveToStorage("history", [...historyData, deletedItem])
  //   }
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  //   // TODO: app crashes when below line uncommmented
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  //   setShoppingList(newShoppingList);
  //   saveToStorage(storageKey, newShoppingList)
  // }
  const handleDelete = (id: string): void => {
  console.log(`Deleted item id: ${id}`);

  const newShoppingList:ShoppingListItemType[] = shoppingList.map((item) => 
    item.id === id 
      ? { ...item, deletedAtTimestamp: Date.now(), eventType: "deleted" } // Mark as deleted
      : item
  );

  // setShoppingList(newShoppingList);
  updateShoppingList(newShoppingList); //using context
  saveToStorage(storageKey, newShoppingList); // Everything stays in one key
};

  // user complete shopping list item
 const handleToggleComplete = (id: string): void => {
  console.log(`Toggled task completion: ${id} at ${Date.now()}`);

  const newShoppingList: ShoppingListItemType[] = shoppingList.map((item) => {
    if (item.id === id) {
      // Trigger haptic feedback based on action
      if (item.completedAtTimestamp) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Marking as incomplete
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // Marking as completed
      }

      return {
        ...item,
        completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now(), // Toggle completion timestamp
        lastUpdatedTimestamp: Date.now(),
        eventType: item.completedAtTimestamp ? "incomplete" : "completed",
        historyTimestamp: item.historyTimestamp ?? Date.now(), // Preserve meaningful timestamp history
      };
    } else {
      return item;
    }
  });

  // Smooth animation effect
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  // Update state and persist changes
  // setShoppingList(newShoppingList);
  updateShoppingList(newShoppingList); //using context
  saveToStorage(storageKey, newShoppingList);
};

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
//** Order by
// display the incomplet item first
// when a new item is added, it gets put at the top of the incompete pile
// when it is marked as done, it goes to the top of the complete pile
// when a previously completed item is marked incompleted, it goes back to the top of incompleted pile */
const orderShoppingList = (shoppingList:ShoppingListItemType[]) => {
  const filteredShoppingList = shoppingList.filter(item => item.eventType !== "deleted")
  return filteredShoppingList.sort((item1,item2)=>{
    
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


 // data persistant app
 // need to store the shopping list in the local storage
    //When new item is created - handleSubmit
    //When task marked complete or incomplete - toggleComplete
    //When task is deleted - handleDelete
// read from the local storage
    //When rendering the list to app using FlatList - index.tsx