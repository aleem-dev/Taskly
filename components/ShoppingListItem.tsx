import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {theme} from "../theme"
import AntDesign from '@expo/vector-icons/AntDesign'; //delete icon
import Entypo from '@expo/vector-icons/Entypo'; //open items

type Props = {
    name: string;
    isCompleted?: boolean;
}

export const ShoppingListItem:React.FC<Props> = ({name, isCompleted}) => {
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
          <View style={[
            styles.itemContainer,
            isCompleted?styles.completedContainer:undefined
            ]}>
            <View style={styles.row}>
                <Entypo
                    name={isCompleted?"check":"circle"}
                    size={24}
                    color={isCompleted?theme.colorGrey:theme.colorCerulean}
                />
                <Text style={[
                    styles.itemText,
                    isCompleted?styles.compltedText:undefined
                    ]}>{name}</Text>
            </View>
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
              {/* <Text style={styles.itemButtonText}>Delete</Text> */}
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
//   itemButtonText:{ //as the icon button is installed instead of text
//     color:theme.colorWhite,
//     fontWeight:'600',
//     textTransform:"uppercase",
//     letterSpacing:1,
//   },
  completedContainer:{
    backgroundColor:theme.colorLightGrey,
    borderBottomColor:theme.colorLightGrey,
  },
  compltedText:{
    color:theme.colorGrey,
    textDecorationLine:'line-through',
    textDecorationColor:theme.colorGrey,
  },
  completedButton:{
    backgroundColor:theme.colorLightGrey,
  },
  row:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
  }
});