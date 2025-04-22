import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {theme} from "../theme"

type Props = {
    name: string;
}

export const ShoppingListItem:React.FC<Props> = ({name}) => {
    const handleDelete = () => {
        Alert.alert("Are you sure you want to delete this?","it will be gone for good",[
          {
            text:"Yes",
            onPress: ()=> console.log("Ok, deleting..."),
            style:"destructive"
          },
          {
            text:"No",
            style:"cancel"
          }
        ])
      }
      return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{name}</Text>
            <TouchableOpacity 
                style={styles.itemButton}
                onPress={handleDelete}
                activeOpacity={0.8}
            >
              <Text style={styles.itemButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
    );
}
const styles = StyleSheet.create({
  itemContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingVertical:16,
    paddingHorizontal:8,
    borderBottomColor:theme.colorCerulean,
    borderBottomWidth:1,
  },
  itemText:{
    fontSize:18,
    fontWeight:"200",
  },
  itemButton:{
    backgroundColor:theme.colorBlack,
    padding:8,
    borderRadius:6,
  },
  itemButtonText:{
    color:theme.colorWhite,
    fontWeight:'600',
    textTransform:"uppercase",
    letterSpacing:1,
  },
});