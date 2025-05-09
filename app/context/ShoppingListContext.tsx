import { createContext, useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage";

export const ShoppingListContext = createContext(null);

export const ShoppingListProvider = ({children}) => {
    const[shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        const fetchInitialList = async () => {
            const storedList = await getFromStorage("shopping-list") ?? [];
            setShoppingList(storedList);
        };
        fetchInitialList();
    },[])

    const updateShoppingList = (newList) => {
        setShoppingList(newList);
        saveToStorage("shopping-list", newList)
    };

    return(
        <ShoppingListContext.Provider value={{shoppingList, updateShoppingList}}>
            {children}
        </ShoppingListContext.Provider>
    )
}
export default ShoppingListProvider