import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, Pressable} from 'react-native'
import {theme} from "../theme"
import AntDesign from '@expo/vector-icons/AntDesign'; //delete icon
import Entypo from '@expo/vector-icons/Entypo'; //open items
import * as Haptics from "expo-haptics"

type Props = {
    name: string;
    isCompleted?: boolean;
    onDelete?:()=>void;
    onToggleComplete?:()=>void
}

export const ShoppingListItem:React.FC<Props> = ({name, isCompleted, onDelete,onToggleComplete}) => {
 
  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);    
    Alert.alert("Are you sure you want to delete this?","it will be gone for good",[
          {
            text:"Yes",
            onPress: ()=> onDelete(),
            style:"destructive"
          },
          {
            text:"No",
            style:"cancel"
          }
        ])
      }
      return (
          <View style={[
            styles.itemContainer,
            isCompleted?styles.completedContainer:undefined
            ]}>
            <Pressable style={styles.row}
            onPress={onToggleComplete}
            hitSlop={20}
            >
                <Entypo
                    name={isCompleted?"check":"circle"}
                    size={24}
                    color={isCompleted?theme.colorGrey:theme.colorCerulean}
                />
                <Text style={[
                    styles.itemText,
                    isCompleted?styles.compltedText:undefined
                    ]}>{name}</Text>
            </Pressable>
            <TouchableOpacity 
                hitSlop={20}
                onPress={handleDelete}
                activeOpacity={0.8}
            >
                <AntDesign 
                    name="closecircle" 
                    size={24} 
                    color={isCompleted?theme.colorGrey:theme.colorRed} 
                />
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
    marginLeft:8,
    flex:1,
  },
  itemButton:{
    backgroundColor:theme.colorWhite,
    padding:8,
    borderRadius:6,
  },
  completedContainer:{
    backgroundColor:theme.colorLightGrey,
    borderBottomColor:theme.colorLightGrey,
  },
  compltedText:{
    color:theme.colorGrey,
    textDecorationLine:'line-through',
    textDecorationColor:theme.colorGrey,
  },
  row:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
  }
});