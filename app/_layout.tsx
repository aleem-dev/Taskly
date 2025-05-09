import {Stack} from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// Refector: Implement React Native Bottom Tabs Library 3rd Party library with Expo router
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";
import {Tabs} from 'expo-router' // comment this as we are going to cretae our Tab
// import {Tabs} from '@/components/bottom-tabs'
import { ShoppingListProvider } from './context/ShoppingListContext';

export default function Layout(){
  // const Tabs = withLayoutContext(
  //   createNativeBottomTabNavigator().Navigator
  // )

  return(
    // <Stack>
    //   <Stack.Screen name='index' options={{title:"Shopping List"}}/>
    //   <Stack.Screen name='counter' options={{title:"Counter", presentation:'modal', animation:'fade_from_bottom'}}/>
    //   <Stack.Screen name='idea' options={{title:"Idea", presentation:'modal', animation:'fade_from_bottom'}}/>
    // </Stack>
    <ShoppingListProvider>
    <Tabs>
      <Tabs.Screen 
        name='index' 
        options={{
          title:"Shopping List",
          tabBarIcon:({color, size})=>(
          <Feather name="list" size={24} color="black" />
          )  // commented it to implement the React Native Bottom Tabs
              //  it does not take component as icon, need to give svg, png, jpg or url
          // tabBarIcon:() => ({
          //   uri:'https://www.svgrepo.com/show/532198/list-ul-alt.svg'
          // })
          }}/>
      <Tabs.Screen 
        name='counter' 
        options={{
          title:"Tab Counter",
          headerShown:  false,
          tabBarIcon:({color, size})=>(
          <AntDesign name="clockcircleo" size={24} color="black" />
          )
          // tabBarIcon:() => ({
          //   uri:'https://www.svgrepo.com/show/532122/clock-three.svg'
          // })
          }}/>
      <Tabs.Screen 
        name='idea' 
        options={{
          title:"Idea",
          tabBarIcon:()=>(
          <FontAwesome5 name="lightbulb" size={24} color="black" />
          )
          // tabBarIcon:() => ({
          //   uri:'https://www.svgrepo.com/show/488830/bulb.svg'
          // })
          }}/>
    </Tabs>
    </ShoppingListProvider>
  )
}

//** Note: On android, the animation for the modal looks the 
// same as the stack - the platform default. Generally it's 
// best to stick with the UX befitting the platform, but you 
// could experiment with changing it 
// e.g. to animation: "fade_from_bottom". */

//** Use a tab navigator With Expo Router, it's actually 
// delightfully easy to set this up: simply 
// change the Stack in your layout file to Tabs. */

//** Also note that since the folder (tabs) and (products) products
// are there it will  show as bottom tab, this behaviour is limited
// to Tabs navigation */

//** Add icons to tab navigation please not that we need to provide
// call back more appropriate IIFY immidiately Invoiked Function Expression
// as we are passing a the ICON component */