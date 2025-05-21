import { Link, Stack } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "../../theme";
import { Pressable } from "react-native";
import ShoppingListProvider from '@/context/ShoppingListContext';

export default function Layout() {
   return (
    // <ShoppingListProvider>
     <Stack>
{/* -      <Stack.Screen name="index" options={{ title: "Counter" }} /> */}
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => {
            return (
              <Link href="/counter/history" asChild>
                <Pressable hitSlop={20}>
                  <MaterialIcons
                    name="history"
                    size={32}
                    color={theme.colorGrey}
                  />
                </Pressable>
              </Link>
            );
          },
        }}
      />
       <Stack.Screen name="history" options={{ title: "History" }} />
     </Stack>
    //  </ShoppingListProvider>
   );
}