import { useContext } from "react";
import { format } from "date-fns";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { theme } from "@/theme";
import { ShoppingListContext } from "@/context/ShoppingListContext";

export default function HistoryScreen() {
  const { shoppingList } = useContext(ShoppingListContext);

  // Function to retrieve the most relevant timestamp safely
  const getTimestamp = (item) => {
    return item.createdAtTimestamp ?? item.completedAtTimestamp ?? item.deletedAtTimestamp ?? null;
  };

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      renderItem={({ item }) => {
        // const timestamp = getTimestamp(item);
        const timestamp = item.lastUpdatedTimestamp;
        const formattedDate = timestamp ? format(new Date(timestamp), "LLL d yyyy, h:mm aaa") : "Unknown Date";

        return (
          <View style={styles.listItem}>
            <Text style={styles.taskPreview}>{item.name.split(" ").slice(0, 2).join(" ")}</Text>
            <Text style={styles.eventText}>
              {item.eventType.toUpperCase()} - {formattedDate}
            </Text>
            {/* <Text style={styles.eventText}>
              {item.buff}
            </Text> */}
          </View>
        );
      }}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text style={styles.emptyText}>No history recorded yet</Text>
        </View>
      }
    />
  );
}

const orderShoppingList = (shoppingList:ShoppingListItemType[]) => {
  // const filteredShoppingList = shoppingList.filter(item => item.eventType !== "deleted")
  return shoppingList.sort((item1,item2)=>{
    
      if(item1.lastUpdatedTimestamp && item2.lastUpdatedTimestamp){
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp
      }
      if(item1.lastUpdatedTimestamp && !item2.lastUpdatedTimestamp){
        return 1
      }
      if(!item1.lastUpdatedTimestamp && item2.lastUpdatedTimestamp){
        return -1
      }
      if(!item1.lastUpdatedTimestamp && !item2.lastUpdatedTimestamp){
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp
      }
      return 0
    }
  )
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: theme.colorWhite },
  contentContainer: { padding: 16 },
  listEmptyContainer: { justifyContent: "center", alignItems: "center", marginVertical: 18 },
  emptyText: { fontSize: 18, color: theme.colorGrey },
  listItem: { padding: 14, borderRadius: 8, marginBottom: 10, alignItems: "center", backgroundColor: theme.colorLightGrey },
  taskPreview: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  eventText: { fontSize: 14, color: theme.colorBlack },
});
